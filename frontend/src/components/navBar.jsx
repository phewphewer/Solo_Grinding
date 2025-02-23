import React from "react";
import { Link } from "react-router-dom";
const navBar = () => {
  return (
    <>
      <div className=" bg-blue-900 w-[100%] py-4">
        <Link to="/">
          <h1 className="text-5xl px-10">Workout Buddy</h1>
        </Link>
      </div>
    </>
  );
};

export default navBar;
