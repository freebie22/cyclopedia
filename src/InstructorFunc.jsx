import React from "react";
import { useEffect } from "react";

const InstructorFunc = () => {
  useEffect(() => {
    return () => {
      console.log("Instructor Func - Unmounted");
    };
  }, []);
  return (
    <div>
      <br />
      <span>Name: {props.instructor.name}</span>
      <br />
      <span>Phone: {props.instructor.phone}</span>
      <br />
      <span>Email: {props.instructor.email}</span>
    </div>
  );
};

export default InstructorFunc;
