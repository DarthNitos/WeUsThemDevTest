const { Router } = require("express");
const router = Router();
const { check, validationResult } = require("express-validator");
const Contact = require("../models/Contact");

// /api/contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();

    if (!contacts)
      return res.status(400).json({ message: "No contacts found..." });

    res.status(200).json(contacts);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again later." });
  }
});

// /api/contacts
router.post(
  "/",
  [
    check("email", "Wrong email").isEmail,
    check("cell", "Wrong cell phone number").isMobilePhone,
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data while aading a new contact!",
        });
      }

      const { firstName, lastName, email, cell, image } = req.body;

      const candidate = await Contact.findOne({ email });

      if (candidate) {
        return res.status(400).json({
          message: "User with this email has already been created",
        });
      }

      const newContact = new Contact(firstName, lastName, email, cell, image);

      await newContact.save();

      res.status(201).json({ message: "New Contact has been created" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong. Try again later." });
    }
  }
);

// /api/contacts/id
router.put("/:id", async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      message: "Incorrect data while deleting a contact!",
    });
  }

  const contact = await Contact.findByIdAndUpdate(
    req.body.id,
    { firstName: req.body.firstName },
    { lastNmae: req.body.lastName },
    { email: req.body.emal },
    { cell: req.body.cell },
    { image: req.body.image }
  );

  if (!contact)
    return res.status(404).send("The contact with the given ID was not found.");

  res.send(contact);
});

// /api/contacts/id
router.delete("/:id", async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Incorrect data while deleting a contact!",
      });
    }

    const contact = await Contact.findByIdAndRemove(req.body.id);

    console.log(req.body.id);

    if (!contact)
      return res
        .status(404)
        .send("The contact with the given ID was not found.");

    res.send(contact);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong. Try again later." });
  }
});

module.exports = router;
