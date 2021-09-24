import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const UpdateContact = () => {
  const contactID = useParams().id;
  const { request } = useHttp();
  const [form, setForm] = useState({
    id: contactID,
    firstName: "",
    lastName: "",
    email: "",
    cell: "",
    file: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(contactID);
      const data = await request("/api/contacts/:id", "PUT", { ...form }, {});
    } catch (e) {
      //  Handled by the http.hook
    }
  };

  return (
    <div className="row">
      <h1>Update Contact's Info</h1>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              className="validate"
              name="firstName"
              value={form.firstName}
              onChange={changeHandler}
            />
          </div>
          <div className="input-field col s6">
            <label htmlFor="last_name">Last Name</label>
            <input
              id="last_name"
              type="text"
              className="validate"
              name="lastName"
              value={form.lastName}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="validate"
              name="email"
              value={form.email}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="cell">Cell Phone</label>
            <input
              id="cell"
              type="tel"
              className="validate"
              name="cell"
              value={form.cell}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="row">
          <div className="file-field input-field">
            <div className="btn">
              <span>Upload new Image</span>
              <input
                type="file"
                className="file-path validate"
                name="file"
                value={form.file}
                onChange={changeHandler}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                id="file"
                className="file-path validate"
                type="text"
                name="file"
                value={form.file}
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
      </form>

      <button
        className="btn waves-effect waves-light"
        type="submit"
        name="action"
        onClick={updateHandler}
      >
        Submit
        <i className="material-icons right">send</i>
      </button>

      <br />
      <br />

      <Link to={`/contacts`}>
        <span>Go Back</span>
      </Link>
    </div>
  );
};
