import { HambergerMenu } from "iconsax-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { PagesUrls } from "../constant/PagesUrl";

const LINK_ITEMS = [
  {
    title: "محدودی",
    link: PagesUrls.limit,
  },
  {
    title: "آزاد",
    link: PagesUrls.free,
  },
  {
    title: "کمانی",
    link: PagesUrls.freeCurve,
  },
  {
    title: "زاویه-خوشه",
    link: PagesUrls.cluster,
  },
];

const Drawer = () => {
  const [show, setShow] = useState(false);
  const [backDrop, setBackDrop] = useState(false);

  const openDrawer = () => {
    setBackDrop(true);
    setTimeout(() => {
      setShow(true);
    }, 120);
  };
  const closeDrawer = () => {
    setShow(false);
    setTimeout(() => {
      setBackDrop(false);
    }, 120);
  };
  return (
    <>
      <div
        onClick={openDrawer}
        className={` fixed z-40 top-1 left-1 bg-white  p-2 rounded-lg  cursor-pointer text-primary-700 border-primary-700 border-2 `}
        role="button"
      >
        <HambergerMenu size="25" color="currentcolor" />
      </div>

      <div
        className={`${
          backDrop ? "block" : "hidden"
        } fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50`}
        onClick={closeDrawer}
      />

      <div
        className={`fixed flex flex-col w-40 bg-white p-2 shadow-xl h-dvh top-0 bottom-0 z-[100] transition-all duration-700 ease-in-out ${
          show ? "right-0" : "right-[-50%]"
        }`}
      >
        <Link
          to={PagesUrls.limit}
          className=" my-5 pb-3 flex gap-2 justify-center items-center h-fit border-b-2 border-b-primary-700"
        >
          <img className="w-8 h-8" src="/vite.svg" alt="vite" />
          <h1 className="text-md">Vite Leaflet</h1>
        </Link>
        <div className="flex flex-col gap-5">
          {LINK_ITEMS.map((li) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary-400 p-2 text-white rounded-lg shadow-[1px_4px_16px_1px_#e3badb]"
                    : ""
                }
                to={li.link}
                key={li.link}
                onClick={closeDrawer}
              >
                {li.title}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
};

const BlankLayout = () => {
  return (
    <div className="flex">
      <Drawer />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BlankLayout;
