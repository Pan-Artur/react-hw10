import { Component } from "react";

import { StyledPhoneList } from "./StyledPhoneList";

export class PhoneList extends Component {
    render() {
        const { contacts, onDelete } = this.props;

        return (
            <StyledPhoneList>
                <h2>Contacts</h2>
                <div>
                    <label htmlFor="filter">Find contacts by name</label>
                    <input type="text" name="filter" value={this.props.value} onChange={this.props.onChange} />
                </div>
                <ul>
                    {contacts.map((contact) => (
                        <li key={contact.id}>
                            <p>{contact.name}: {contact.number}</p>
                            <button type="button" onClick={() => onDelete(contact.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </StyledPhoneList>
        );
    }
}