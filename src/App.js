import { Component } from "react";

import { PhoneEditor } from "./components/PhoneEditor/PhoneEditor";
import { PhoneList } from "./components/PhoneList/PhoneList";

import { nanoid } from "nanoid";

import "./App.css";

export class App extends Component {
  state = {
    contacts: [],
    filter: "",
    name: "",
    number: "",
  };

  handleInputChange = (name, value) => {
    this.setState({ [name]: value });
  };

  addContact = (name, number) => {
    if (name.trim() === "" || number.trim() === "") {
      return;
    }

    const isNameExists = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isNameExists) {
      alert(`${name} вже є в телефонній книзі!`);
      return;
    }

    this.setState((prevState) => ({
      contacts: [...prevState.contacts, { id: nanoid(5), name, number }],
      name: "",
      number: "",
    }));
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  }

  loadContacts = (contacts) => {
    this.setState({
      contacts
    });
  }

  render() {
    const { contacts, filter, name, number } = this.state;

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className="App">
        <h1>Phonebook</h1>
        <PhoneEditor
          onAddContact={this.addContact}
          onChange={this.handleInputChange}
          name={name}
          number={number}
        />
        <PhoneList
          contacts={filteredContacts}
          value={filter}
          onChange={this.handleFilterChange}
          onDelete={this.deleteContact}
          onLoad={this.loadContacts}
        />
      </div>
    );
  }
}
