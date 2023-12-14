import React from "react";

class Instructor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("Insturctor - Mounted");
  };

  componentDidUpdate = () => {
    console.log("Insturctor - Updated");
  };

  componentWillUnmount = () => {
    console.log("Insturctor - Unmounted");
  };


  render() {
    console.log("Instructor - rendered");
    return (
        <div>
        <br />
        <span>Name: {this.props.instructor.name}</span>
        <br />
        <span>Phone: {this.props.instructor.phone}</span>
        <br />
        <span>Email: {this.props.instructor.email}</span>
      </div>
    );
  }
}

export default Instructor;
