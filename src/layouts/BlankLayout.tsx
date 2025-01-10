import { useState } from "react";
import { Link, Outlet } from "react-router";

const BlankLayout = () => {
  const [show, setshow] = useState(false);
  return (
    <div className="flex">
      <button
        className="fixed top-0 left-0 h-64 w-20 bg-red-600 z-50"
        onClick={() => setshow(!show)}
      >
        {!show ? "show" : "hide"}
      </button>
      <div
        className={`fixed grid w-32 bg-primary-50 p-2 shadow-xl h-dvh top-0 bottom-0 z-50 transition-all duration-700 ease-in-out ${
          show ? "right-0" : "right-[-50%]"
        }`}
      >
        
        <Link to='/'>limitMap</Link>
        <Link to='/free'>free</Link>
        <Link to='/free-curve'>freeMapCurve</Link>
        <Link to='/cluster'>cluster</Link>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BlankLayout;
