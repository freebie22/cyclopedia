import React from "react";
import Instructor from "./Instructor";
import { getRandomUser } from "./Utility/api";

class CycleOPediaClassPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem("cyclopediaState")) || {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
      inputName: "",
      inputFeedback: "",
    };
  }

  componentDidMount = async () => {
    if (JSON.parse(localStorage.getItem("cyclopediaState"))) {
      //   this.setState(JSON.parse(localStorage.getItem("cyclopediaState")));
      console.log("Component Did Mount");
    } else {
      console.log("Component Did Mount");
      const response = await getRandomUser();
      console.log(response);
      this.setState((previousState) => {
        return {
          instructor: {
            name: response.data.first_name + " " + response.data.last_name,
            phone: response.data.phone_number,
            email: response.data.email,
          },
        };
      });
    }
  };

  handleAddStudent = () => {
    this.setState((previousState) => {
      return {
        studentCount: previousState.studentCount + 1,
      };
    });
  };

  handleRemoveAllStudent = () => {
    this.setState(() => {
      return {
        studentCount: 0,
        studentList: [],
      };
    });
  };

  handleToggleHideInstructor = () => {
    this.setState((previousState) => {
        return {
            hideInstructor: !previousState.hideInstructor
        }
    })
  }

  componentDidUpdate = async (previousProps, previousState) => {
    console.log("Component Did Update");
    localStorage.setItem("cyclopediaState", JSON.stringify(this.state));
    console.log("Old state - " + previousState.studentCount);
    console.log("New state - " + this.state.studentCount);
    if(previousState.studentCount < this.state.studentCount)
    {
        const response = await getRandomUser();
        this.setState((previousState) => {
            return {
                studentList: [
                    ...previousState.studentList,
                    {
                        name: response.data.first_name + " " + response.data.last_name
                    }

                ]
            }
        })
    }
    else if(previousState.studentCount > this.state.studentCount)
    {
        this.setState(() => {
            return {
                studentList: []
            }
        })
    }
  }

  componentWillUnmount() {
    console.log("Component Will UnMount");
  }

  render() {
    console.log("Render Component");
    return (
      <div>
        <div className="p-3">
          <span className="h4 text-success">Instructor</span>
          <i onClick={this.handleToggleHideInstructor} className={`bi ${this.state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"} btn btn-success btn-sm`}></i>
          {!this.state.hideInstructor && this.state.instructor ? (
            <Instructor instructor={this.state.instructor}></Instructor>
          ) : null}
        </div>
        <div className="p-3">
          <span className="h-4 text-success">Feedback</span>
          <br />
          <input
            value={this.state.inputName}
            type="text"
            placeholder="Name.."
            onChange={(e) => {
              this.setState(() => {
                return {
                  inputName: e.target.value,
                };
              });
            }}
          />
          Value: {this.state.inputName}
          <br />
          <textarea
            value={this.state.inputFeedback}
            placeholder="Feedback..."
            onChange={(e) => this.setState({ inputFeedback: e.target.value })}
          ></textarea>
          Value: {this.state.inputFeedback}
        </div>
        <div className="p-3">
          <span className="h4 text-success">Students</span>
          <div>Student Count: {this.state.studentCount}</div>
          <button
            onClick={this.handleAddStudent}
            className="btn btn-success btn-sm"
          >
            Add Student
          </button>
          &nbsp;
          <button
            onClick={this.handleRemoveAllStudent}
            className="btn btn-danger btn-sm"
          >
            Remove All Students
          </button>
          {this.state.studentList.map((student, index) => {
            return (
                <div className="text-white" key={index}>- {student.name}</div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default CycleOPediaClassPage;
