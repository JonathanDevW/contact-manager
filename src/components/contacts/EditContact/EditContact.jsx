import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ContactService from "../../../services/ContactService";
import Spinner from '../../spinner/Spinner'

function EditContact() {
  let navigate = useNavigate();
  let { contactid } = useParams();
  console.log(contactid);

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        let response = await ContactService.getById(contactid);
        let groupResponse = await ContactService.getGroups();
        setState((prevState) => ({
          ...prevState,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
          errorMessage: "", // Reset error message upon successful fetch
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          errorMessage: "Error fetching contacts", // Set appropriate error message
        }));
        console.error("Error fetching contacts:", error);
      }
    };

    fetchData(); // Call the async function
  }, [contactid]); // Dependency array with only contactid

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateData(state.contact, contactid);
      if (response) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        errorMessage: error.message,
      }));
      navigate(`/contact/edit/${contactid}`, { replace: false });
    }
  };

  const { loading, contact, groups } = state;

  return (
    <React.Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold">Edit Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Praesentium, tempore dicta. Dolores illo at dolorum ducimus
                    temporibus accusamus excepturi fugiat neque ullam
                    praesentium, doloremque exercitationem placeat dolorem earum
                    fugit doloribus!
                  </p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-mb-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        name="name"
                        onChange={updateInput}
                        required="true"
                        value={contact.name}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="photo"
                        onChange={updateInput}
                        required="true"
                        value={contact.photo}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="mobile"
                        onChange={updateInput}
                        required="true"
                        value={contact.mobile}
                        type="number"
                        className="form-control"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="email"
                        onChange={updateInput}
                        required="true"
                        value={contact.email}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="company"
                        onChange={updateInput}
                        required="true"
                        value={contact.company}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        name="title"
                        onChange={updateInput}
                        required="true"
                        value={contact.title}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="groupid"
                        onChange={updateInput}
                        required="true"
                        value={contact.groupId}
                        className="form-control"
                      >
                        <option value="">Select a group</option>
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-success"
                        value="Edit"
                      />
                      <Link
                        to={"/contacts/list"}
                        className="btn btn-primary ms-2"
                      >
                        Cancel
                      </Link>
                    </div>
                  </form>
                  <div className="col-mb-6">
                    <img className="contact-img" src={contact.photo} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default EditContact;
