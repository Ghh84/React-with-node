import React, { Component } from "react";
import Select from "react-select";
import countryList from "react-select-country-list"

class Country extends Component {
  constructor(props) {
    super(props);
    this.options = countryList().getData();

    this.state = {
      options: this.options,
      value: this.value
    };
  }

  changeHandler = (value) => {
    this.setState({ value });
  };

  render() {
    return (
      <form >
            <div style={{width: '185px'}}>
            <Select
              menuPlacement="auto"
              menuPosition="fixed"
              placeholder={"Select Country"}
              options={this.state.options}
              value={this.state.value}
              onChange={this.changeHandler}
              required
            />
          </div>
      </form>
    );
  }
}
export default Country;
