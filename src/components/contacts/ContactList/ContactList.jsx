import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/Spinner";

function ContactList() {


  let [query, setQuery] = useState({
    text: ''
  })

  let [state, setState] = useState({
    loading: true,
    contacts: [],
    filterContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        let response = await ContactService.getAllContacts();
        setState({ ...state, loading: true });
        setState({ ...state, loading: false, contacts: response.data, filterContacts: response.data });
      } catch (e) {
        setState({ ...state, loading: false, errorMessage: e.message });
      }
    };

    fetchContacts();
  }, []);

  const clickDelete = async (contactid) => {
    try {
      let response = await ContactService.deleteContact(contactid);
      if (response) {
        let response = await ContactService.getAllContacts();
        setState({ ...state, loading: true });
        setState({ ...state, loading: false, contacts: response.data, filterContacts: response.data });
      }
    }catch(e){
      setState({ ...state, loading: false, errorMessage: e.message });
    }
  }
  //search bar
  const searchContact = (event) => {
      setQuery({...query, text: event.target.value});
      let theContacts = state.contacts.filter(contacts => {
        return contacts.name.toLowerCase().includes(event.target.value.toLowerCase())
      });
      setState({
        ...state,
        filterContacts: theContacts
      })
  }

  let { loading, contacts, filterContacts } = state;

  return (
    <React.Fragment>
      <section className="contact-search m-5">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Contact Manager
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <li className="fa fa-add me-2"></li> Add
                  </Link>
                </p>
                <p className="fw-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Commodi, ut saepe optio sapiente animi ipsam, deserunt
                  accusantium unde aperiam temporibus quam in at dicta
                  necessitatibus perspiciatis dolorem, voluptatum dolor sed.
                </p>
                <div className="row">
                  <div className="col-mb-6">
                    <form className="row">
                      <div className="col">
                        <div className="mb-2">
                          <input
                          name="text"
                          value={query.text}
                          onChange={searchContact}
                            type="text"
                            className="form-control"
                            placeholder="Search Names"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-2">
                          <input
                            type="submit"
                            className="btn btn-outline-dark"
                            value="search"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? <Spinner /> : <React.Fragment></React.Fragment>}
      <section className="contact-list">
        <div className="container">
          <div className="row">
            {filterContacts.length > 0 &&
              filterContacts.map((contact) => {
                return (
                  <div className="col-md-6" key={contact.id}>
                    <div className="card my-2">
                      <div className="card-body">
                        <div className="row align-items-center d-flex justify-content around">
                          <div className="col-md-3">
                            <img
                              src={contact.photo}
                              alt=""
                              className="img-fluid contact-img"
                            />
                          </div>
                          <div className="col-md-7">
                            <ul className="list-group">
                              <li className="list-group-item list-group-item-action">
                                Name: <span className="fw-bold">{contact.name}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Phone: <span className="fw-bold">{contact.mobile}</span>
                              </li>
                              <li className="list-group-item list-group-item-action">
                                Email:{" "}
                                <span className="fw-bold">{contact.email}</span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-1 d-flex flex-column align-items-center">
                            <Link
                              className="btn btn-warning my-1"
                              to={`/contacts/view/${contact.id}`}
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                            <Link
                              className="btn btn-primary my-1"
                              to={`/contacts/edit/${contact.id}`}
                            >
                              <i className="fa fa-pen"></i>
                            </Link>
                            <button onClick={() => clickDelete(contact.id)} className="btn btn-danger my-1">
                              <i className="fa fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default ContactList;
