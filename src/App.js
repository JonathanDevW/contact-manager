import React from "react";
import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import ContactList from "./components/contacts/ContactList/ContactList";
import AddContact from './components/contacts/AddContact/AddContact';
import EditContact from './components/contacts/EditContact/EditContact';
import ViewContact from './components/contacts/ViewContact/ViewContact';
import Spinner from './components/spinner/Spinner';
import { Routes, Route, Navigate } from "react-router-dom";



function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Navigate to={"/contacts/list"} />} />
        <Route path={"/contacts/list"} element={<ContactList />} />
        <Route path={"/contacts/add"} element={<AddContact/>} />
        <Route path={`/contacts/view/:contactid`} element={<ViewContact />} />
        <Route path={`/contacts/edit/:contactid`} element={<EditContact />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
