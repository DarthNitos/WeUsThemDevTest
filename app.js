const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
// const { createProxyMiddleware } = require("http-proxy-middleware");
// const cors = require("cors");

const PORT = process.env.PORT || config.get("port");
const app = express();

// app.use(
//   cors({
//     origin: "*",
//     proxy: "http://localhost:5000/",
//   })
// );

// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:5000/",
//     changeOrigin: true,
//   })
// );

app.use(express.json({ extended: true }));

app.use("/api/contacts", require("./routes/contacts.routes"));

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.group("Error", e.message);

    process.exit(1);
  }
}

start();
