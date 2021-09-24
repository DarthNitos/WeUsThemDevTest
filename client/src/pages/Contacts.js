import React, { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { ContactCard } from "../components/ContactCard";

export const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const { request } = useHttp();

  const fetchContacts = useCallback(async () => {
    try {
      const fetched = await request("/api/contacts", "GET", null, {});

      setContacts(fetched);
    } catch (e) {
      // Handeled by http.hook
    }
  }, [request]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return (
    <>
      <Link to={`/create`}>
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          <span className="white-text">Add a new Contact</span>
        </button>
      </Link>
      <ContactCard contacts={contacts} />
    </>
  );
};
