import axios from 'axios';

export class ContactService {
    static serverURL =  "http://localhost:9000";

    static getAllContacts() {
        let dataURL = `${this.serverURL}/contacts`;
        return axios.get(dataURL)
    }

    static getById(contactid) {
        let dataURL = `${this.serverURL}/contacts/${contactid}`;
        return axios.get(dataURL);
    }
    
    static getGroups() {
        let dataURL = `${this.serverURL}/groups`;
        return axios.get(dataURL)
    }
    
    static getGroup(contact) {
        let groupId = contact.groupId;
        let dataURL = `${this.serverURL}/groups/${groupId}`;
        return axios.get(dataURL)
    }

    static createContact(contact) {
        let dataURL = `${this.serverURL}/contacts`;
        return axios.post(dataURL, contact)
    }
    static updateData(contact, contactid) {
        let dataURL = `${this.serverURL}/contacts/${contactid}`;
        return axios.put(dataURL, contact);
    }

    static deleteContact(contactid) {
        let dataURL = `${this.serverURL}/contacts/${contactid}`;
        return axios.delete(dataURL);
    }
}

export default ContactService;