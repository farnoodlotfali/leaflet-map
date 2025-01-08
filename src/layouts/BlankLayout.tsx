import { useState } from "react";
import { Outlet } from "react-router";

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
        className={`fixed w-32 bg-purple-200 p-2 shadow-xl h-dvh top-0 bottom-0 z-50 transition-all duration-700 ease-in-out ${
          show ? "right-0" : "right-[-50%]"
        }`}
      >
        1
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BlankLayout;
