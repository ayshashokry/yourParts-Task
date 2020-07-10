import React, { Component } from "react";

/* Select library*/
import makeAnimated from "react-select/animated";
import { components } from "react-select";

/* BootStrap */
import { Button, Container, Row, Col } from "reactstrap";

/* Components */
import SearchSelects from "../sections/SearchSelects";

/* Router Link */
import { Link } from "react-router-dom";

/* Redux Connection */
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getDevices } from "../../redux/actions/rootActions";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

const MultiValue = (props) => (
  <components.MultiValue {...props}>
    <span>{props.data.label}</span>
  </components.MultiValue>
);

const animatedComponents = makeAnimated();
class Compare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: [],
    };
  }
  componentDidMount() {
    console.log(this.props.Devices);
  }
  handleChange = (selected) => {
    this.setState({
      optionSelected: selected,
    });
  };

  render() {
    let newArray = [];
    if (this.props.Devices !== undefined) {
      this.props.Devices.map((device) => {
        return newArray.push({ value: device.user, label: device.user });
      });
    } else {
      return null;
    }
    return (
      <Container className='compare-page'>
        <p>You can search and choose any 2 devices and compare between them</p>
        <Row>
          <Col sm={12} md={6}>
            {" "}
            <SearchSelects
              options={newArray}
              isMulti
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              components={{ Option, MultiValue, animatedComponents }}
              onChange={this.handleChange}
              // allowSelectAll={true}
              value={this.state.optionSelected}
            />
            <Button className='mt-4'>
              <Link
                to={{
                  pathname: "/Comparison",
                  selectedvalues: this.state.optionSelected,
                }}
              >
                Compare Now
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { Devices: state.Devices.list };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getDevices }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Compare);