import { Component } from "react";
import { StyledPhoneEditor } from "./StyledPhoneEditor";

export class PhoneEditor extends Component {
  timer = null;

  handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "number") {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      
      this.timer = setTimeout(() => {
        const symbols = value.split("");
        const allowedSymbols = ["0","1","2","3","4","5","6","7","8","9","+","-","(",")"," "];
        const filteredArray = symbols.filter(symbol => allowedSymbols.includes(symbol));
        
        if (filteredArray.join("") !== value) {
          this.props.onChange(name, filteredArray.join(""));
        }
      }, 1000);
    }
    
    this.props.onChange(name, value);
  };

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  validateInput = (value, type) => {
    const symbols = value.split("");
    
    if (type === "name") {
      if (symbols.length < 2 || symbols.length > 30) {
        alert("Ім'я повинно містити від 2 до 30 символів");
        return false;
      }

      return true;
    }
    
    if (type === "number") {
      const digitsOnly = symbols.filter(symbol => !isNaN(parseInt(symbol)));
      
      if (digitsOnly.length < 6 || digitsOnly.length > 15) {
        alert("Номер повинен містити від 6 до 15 цифр");
        return false;
      }
      
      const allowedSymbols = ["0","1","2","3","4","5","6","7","8","9","+","-","(",")"," "];
      const invalidSymbols = symbols.filter(symbol => !allowedSymbols.includes(symbol));
      
      if (invalidSymbols.length > 0) {
        alert("Номер може містити лише цифри, пробіли, +, -, ()");
        return false;
      }
      
      return true;
    }
    
    return true;
  };

  addContact = (e) => {
    e.preventDefault();
    const { name, number, onAddContact } = this.props;

    if (!this.validateInput(name, "name")) return;
    if (!this.validateInput(number, "number")) return;

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
            title="Ім'я (2-30 символів)"
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
            title="Номер (6-15 цифр, може містити +, -, пробіли, дужки)"
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
