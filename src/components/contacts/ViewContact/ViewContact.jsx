import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom';
import ContactService from '../../../services/ContactService';
import Spinner from '../../spinner/Spinner';

function ViewContact() {
  
  const { contactid } = useParams(); // Suponiendo que contactid es algo como "abc:def"

// Limpiando el ID removiendo los dos puntos


  const [state, setState] = useState({
    loading: false,
    contact: null,
    errorMessage: '',
    group : {}
  });

  useEffect(() => {
    const fetchContactById = async () => {
      setState({ loading: true, contact: null, errorMessage: '' }); // Iniciar carga

      try {
        const response = await ContactService.getById(contactid);
        let groupResponse = await ContactService.getGroup(response.data);
        setState({ loading: false, contact: response.data, group: groupResponse.data}); // Establecer datos del contacto
      } catch (error) {
        setState({ loading: false, contact: null, errorMessage: error.message }); // Manejar error
      }
    };

    if (contactid) {
      fetchContactById();
    }
  }, [contactid]); // Ejecutar efecto cuando contactid cambia

  const { loading, contact, group } = state;

  return (
    <React.Fragment>
      <section className='view-contact-intro py-5'>
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning">View Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aut dolore delectus. Nisi, at iure eligendi expedita temporibus obcaecati impedit assumenda corporis maiores! Sed veniam maxime, architecto nulla repudiandae optio.</p>
            </div>
          </div>
        </div>
      </section>

      {loading ? <Spinner /> : 
        contact ? (
          <section className='view-contact mt-3'>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-4">
                  <img src={contact.photo} className='contact-img' alt=''/>
                </div>
                <div className="col-md-8">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-action">
                      Name: <span className="fw-bold">{contact.name}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Phone: <span className="fw-bold">{contact.mobile}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Email: <span className="fw-bold">{contact.email}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Company: <span className="fw-bold">{contact.company}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Title: <span className="fw-bold">{contact.title}</span>
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Group: <span className="fw-bold">{group.name}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <Link to={'/contacts/list'} className='btn btn-warning'>Back</Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <p>Ups!, something happend, try again.</p>
        )
        
      }

    </React.Fragment>
  );
}

export default ViewContact
