import React from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const ContactCard = ({ contacts }) => {
  const { request } = useHttp();

  if (!contacts.length) {
    return <p className="center">No contacts found...</p>;
  }

  const deleteHandler = async (id) => {
    try {
      const data = await request("/api/contacts/:id", "DELETE", { id: id });

      window.location.reload(true);
    } catch (e) {
      //  Handled by the http hook
    }
  };

  return (
    <div className="row">
      {contacts.map((contact) => {
        return (
          <div className="card" key={contact._id}>
            <div className="card-image">
              <img src="sample-1.jpg" alt="img" />
              <Link
                to={`/update/${contact._id}`}
                className="btn-floating halfway-fab waves-effect waves-light orange"
              >
                <i className="material-icons">edit</i>
              </Link>
            </div>
            <div className="card-content">
              <span className="card-title">
                {contact.firstName + " " + contact.lastName}
              </span>
              <p>Cell Phone: {contact.cell}</p>
              <p>Email: {contact.email}</p>
              <button onClick={() => deleteHandler(contact._id)}>
                <i className="material-icons">delete</i>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
