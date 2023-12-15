import React, { useEffect, useState, useRef, useId } from "react";
import Instructor from "./Instructor";
import { getRandomUser } from "./Utility/api";

const CycleOPediaFuncPage = () => {
  const [state, setState] = useState(() => {
    return {
      instructor: undefined,
      studentList: [],
      studentCount: 0,
      hideInstructor: false,
    };
  });

  const [inputName, setInputName] = useState(() => {
    return "";
  });
  const [inputFeedback, setInputFeedback] = useState(() => {
    return "";
  });

  const totalRender = useRef(0);

  const prevStudentCount = useRef(0);

  const feedbackInputRef = useRef(null);

  const id = useId();

  useEffect(() => {
    totalRender.current += 1;
    console.log(totalRender);
  });

  // useEffect(() => {
  //   console.log("This will be called on EVERY Render");
  // });

  const getInstructor = async () => {
    const response = await getRandomUser();
    setState((previousState) => {
      return {
        ...previousState,
        instructor: {
          name: response.data.first_name + " " + response.data.last_name,
          email: response.data.email,
          phone: response.data.phone_number,
        },
      };
    });
  };

  const addStudentToList = async () => {
    const response = await getRandomUser();
    setState((previousState) => {
      return {
        ...previousState,
        studentList: [
          ...previousState.studentList,
          { name: response.data.first_name + " " + response.data.last_name },
        ],
      };
    });
  };

  useEffect(() => {
    feedbackInputRef.current.focus();
    return () => {

    }
  }, [])

  useEffect(() => {
    if (!state.hideInstructor) {
      getInstructor();
    }
  }, [state.hideInstructor]);

  useEffect(() => {
    if (prevStudentCount.current < state.studentCount) {
      addStudentToList();
    } else if (prevStudentCount.current > state.studentCount) {
      setState((previousState) => {
        return {
          ...previousState,
          studentList: [],
        };
      });
    }
  }, [state.studentCount]);

  useEffect(() => {
    prevStudentCount.current = state.studentCount;
    console.log(totalRender);
  }, [state.studentCount]);

  // useEffect(() => {
  //   console.log(
  //     "This will be called on whenever value of InputFeedback is changed"
  //   );
  // }, [inputFeedback, inputName]);

  // useEffect(() => {
  //   console.log("This will be called on Initial/First Render/Mount");
  //   return () => {
  //     console.log("This will be called on when component will unmount");
  //   };
  // }, []);


  const handleAddStudent = () => {
    setState((previousState) => {
      return {
        ...previousState,
        studentCount: previousState.studentCount + 1,
      };
    });
  };

  const handleRemoveAllStudent = () => {
    setState((previousState) => {
      return {
        ...previousState,
        studentCount: 0,
        studentList: [],
      };
    });
  };

  const handleToggleHideInstructor = () => {
    setState((previousState) => {
      return {
        ...previousState,
        hideInstructor: !previousState.hideInstructor,
      };
    });
  };

  return (
    <div>
      <div className="p-3">
        <span className="h4 text-success">Instructor</span>
        <i
          onClick={handleToggleHideInstructor}
          className={`bi ${
            state.hideInstructor ? "bi-toggle-off" : "bi-toggle-on"
          } btn btn-success btn-sm`}
        ></i>
        {!state.hideInstructor && state.instructor ? (
          <Instructor instructor={state.instructor}></Instructor>
        ) : null}
      </div>
      <div className="p-3">
        <span className="h4 text-white">Total Render: {totalRender.current}</span>
      </div>
      <div className="p-3">
        <span className="h-4 text-success">Feedback</span>
        <br />
        <input
          value={inputName}
          type="text"
          placeholder="Name.."
          onChange={(e) => setInputName(e.target.value)}
          id={`${id} - inputName`}
        />
       <label htmlFor={`${id} - inputName`}>Value: {inputName}</label>
        <br />
        <textarea
          value={inputFeedback}
          ref={feedbackInputRef}
          placeholder="Feedback..."
          onChange={(e) => setInputFeedback(e.target.value)}
          id={`${id} - inputFeedback`}
        ></textarea>
        <label htmlFor={`${id} - inputFeedback`}>Value: {inputFeedback}</label>
      </div>
      <div className="p-3">
        <span className="h4 text-success">Students</span>
        <div>Student Count: {state.studentCount}</div>
        <button onClick={handleAddStudent} className="btn btn-success btn-sm">
          Add Student
        </button>
        &nbsp;
        <button
          onClick={handleRemoveAllStudent}
          className="btn btn-danger btn-sm"
        >
          Remove All Students
        </button>
        {state.studentList.map((student, index) => {
          return (
            <div className="text-white" key={index}>
              - {student.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CycleOPediaFuncPage;
