import React, {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import ContactService from "../../../services/ContactService";

function AddContact() {

  let navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      mobile: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
    },
    groups: [],
    errorMessage: ''
  });

  const updateInput = (event) => {
    setState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [event.target.name]: event.target.value
      }
    }));
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        let response = await ContactService.getGroups();
        setState((prevState) => ({
          ...prevState,
          loading: false,
          groups: response.data
        }));
      } catch (e) {
        console.log(e);
      }
    };
    fetchGroups();
  }, []); // Empty dependency array

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate('/contacts/list', { replace: true });
      }
    } catch (error) {
      setState((prevState) => ({
        ...prevState, errorMessage: error.message
      }));
      navigate('/contact/add', { replace: false });
    }
  };

  let { contact, groups } = state; 

  return (
    <React.Fragment>
      <section className="add-contact p-5">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Create Contact</p>
              <p className="text-italic">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium, tempore dicta. Dolores illo at dolorum ducimus
                temporibus accusamus excepturi fugiat neque ullam praesentium,
                doloremque exercitationem placeat dolorem earum fugit doloribus!
              </p>
            </div>
          </div>
          <div className="row">
              <div className="col-mb-4">
                  <form onSubmit={submitForm}>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Name" name="name" required={true} value={contact.name} onChange={updateInput}/>
                    </div>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Photo Url" required={true} name="photo" value={contact.photo} onChange={updateInput}/>
                    </div>
                    <div className="mb-2">
                        <input type="number" className="form-control" placeholder="Phone Number" required={true} name="mobile" value={contact.mobile} onChange={updateInput}/>
                    </div>
                    <div className="mb-2">
                        <input type="email" className="form-control" placeholder="Email" name="email" required={true} value={contact.email} onChange={updateInput}/>
                    </div>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Company" name="company" required={true} value={contact.company} onChange={updateInput}/>
                    </div>
                    <div className="mb-2">
                        <input type="text" className="form-control" placeholder="Title"  name="title" required={true} value={contact.title} onChange={updateInput}/>
                    </div>
                    <div className="mb-2">
                        <select className="form-control" required={true} name="title" value={contact.title} onChange={updateInput}>
                              <option value="">Select a group</option>
                              {
                                groups.length > 0 &&
                                groups.map(group => {
                                  return (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                  )
                                })
                              }
                        </select>
                    </div>
                    <div className="mb-2">
                    <input type="submit" className="btn btn-success" value="Create"/>
                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                    </div>
                    
                  </form>
              </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default AddContact;
