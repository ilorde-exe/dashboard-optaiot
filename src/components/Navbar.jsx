import React from "react";
import { LayoutPanelTop, Zap, ThermometerSnowflake } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = (props) => {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 justify-start rtl:justify-end">
              <LayoutPanelTop size={32} className="text-white" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-white">
                Dashboard
              </span>
            </div>
            <div className="p-1 bg-white rounded-lg">
              <img src={logo} alt="" className="h-8" />
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                onClick={props.allHandler}
                href="#"
                className="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  All Devices
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium   rounded-full bg-blue-900 text-blue-300">
                  {props.allData[0] + props.allData[1]}
                </span>
              </a>
            </li>
            <li>
              <a
                onClick={props.chillerHandler}
                href="#"
                className="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group"
              >
                <ThermometerSnowflake className="w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">Chillers</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium   rounded-full bg-blue-900 text-blue-300">
                  {props.allData[0]}
                </span>
              </a>
            </li>
            <li>
              <a
                onClick={props.upsHandler}
                href="#"
                className="flex items-center p-2  rounded-lg text-white hover:bg-gray-700 group"
              >
                <Zap className="w-5 h-5  transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  UPS Systems
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium   rounded-full bg-blue-900 text-blue-300">
                  {props.allData[1]}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
