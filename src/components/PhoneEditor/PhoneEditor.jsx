import { Component } from "react";

import { StyledPhoneEditor } from "./StyledPhoneEditor";

export class PhoneEditor extends Component {
  handleChange = (e) => {
    const { name, value } = e.target;

    this.props.onChange(name, value);
  };

  addContact = (e) => {
    e.preventDefault();

    const { name, number, onAddContact } = this.props;

    if (name.trim() !== "" && number.trim() !== "") {
      onAddContact(name, number);
    }
  };

  render() {
    const { name, number } = this.props;

    return (
      <StyledPhoneEditor>
        <div>
          <h2>Name</h2>
          <input
            type="text"
            value={name}
            onChange={this.handleChange}
            name="name"
            pattern="[a-zA-Zа-яА-Я\s'\-]+"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div>
          <h2>Number</h2>
          <input
            type="tel"
            value={number}
            onChange={this.handleChange}
            name="number"
            pattern="[0-9\s()+\\-]+"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <button type="button" onClick={this.addContact}>
          Add contact
        </button>
      </StyledPhoneEditor>
    );
  }
}

