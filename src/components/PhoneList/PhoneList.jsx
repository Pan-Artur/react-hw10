import { Component } from "react";

import { FaPhoneAlt } from "react-icons/fa";

import { StyledPhoneList } from "./StyledPhoneList";

export class PhoneList extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.contacts !== prevProps.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.props.contacts));
    }
  }

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");

    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);

      const validContacts = parsedContacts.filter((contact) => contact && contact.name && contact.number);

      this.props.onLoad(validContacts);
    }
  }

  render() {
    const { contacts, onDelete } = this.props;
    const hasContacts = contacts.length > 0;

    return (
      <StyledPhoneList>
        <h2>Contacts</h2>
        <div>
          <label htmlFor="filter">Find contacts by name</label>
          <input
            type="text"
            name="filter"
            value={this.props.value}
            onChange={this.props.onChange}
          />
        </div>

        {!hasContacts && <p>No contacts yet.</p>}

        {hasContacts && (
          <ul>
            {contacts.map((contact) => (
              <li key={contact.id}>
                <FaPhoneAlt />
                <p>
                  {contact.name}: {contact.number}
                </p>
                <button type="button" onClick={() => onDelete(contact.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </StyledPhoneList>
    );
  }
}
