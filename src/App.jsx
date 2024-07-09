import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { LucideChevronsUpDown, InfoIcon } from "lucide-react";
import "./index.css";
import {
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { chillers, upsSystems } from "./data";

function App() {
  const [chillerIsCollapsed, setChillerIsCollapsed] = useState(true);
  const [upsIsCollapsed, setUpsIsCollapsed] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      "https://uuhkltdgazctpotmtxom.supabase.co/rest/v1/internal1?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGtsdGRnYXpjdHBvdG10eG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY4OTIyMjksImV4cCI6MjAzMjQ2ODIyOX0.btb5VSLKX--4XJgpT9s3hU2n67W5OW7GJKB-BVTWcOU"
    )
      .then((response) => {
        // Log the raw response data
        console.log("Raw Response Data:", response);
        return response.json();
      })
      .then((data) => {
        // Log the parsed JSON data
        console.log("Parsed JSON Data:", data);
        setData(data);
      })
      .catch((error) => console.log(error));

    console.log(data);
  }, []);
  const handleChillerCollapseToggle = () => {
    setChillerIsCollapsed(!chillerIsCollapsed);
  };
  const handleUpsCollapseToggle = () => {
    setUpsIsCollapsed(!upsIsCollapsed);
  };
  const handleAllToggle = () => {
    const newChillerIsCollapsed = chillerIsCollapsed && upsIsCollapsed;
    const newUpsIsCollapsed = chillerIsCollapsed && upsIsCollapsed;
    setChillerIsCollapsed(!newChillerIsCollapsed);
    setUpsIsCollapsed(!newUpsIsCollapsed);
  };

  const totalChillers = chillers.length;
  <span className="self-center text-xl font-semibold font-mono underline underline-offset-4 sm:text-2xl whitespace-nowrap text-white">
    Electra - SYSTEM STATUS
  </span>;
  const totalUPS = upsSystems.length;
  const allData = [totalChillers, totalUPS];
  return (
    <div className="pb-16 min-h-screen bg-gray-800 -z-10">
      <Navbar
        allData={allData}
        chillerHandler={handleChillerCollapseToggle}
        upsHandler={handleUpsCollapseToggle}
        allHandler={handleAllToggle}
      />
      <div className="pt-16 pl-64 text-white">
        <div className="flex items-center justify-between px-5 py-3 lg:px-10 lg:pl-5">
          <h1 className="text-2xl font-semibold">Chillers</h1>
          <LucideChevronsUpDown
            size={24}
            onClick={handleChillerCollapseToggle}
          />
        </div>
        <Transition
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          show={chillerIsCollapsed}
        >
          <div className="mx-3 pl-1 grid grid-cols-4 gap-2">
            {chillerIsCollapsed &&
              chillers.map((device) => (
                <div
                  key={device.id}
                  className={`bg-gray-900 rounded-lg shadow p-3 border ${
                    device.status_code === 1
                      ? "border-green-400"
                      : device.status_code === 0
                      ? "border-gray-400"
                      : "border-red-400"
                  } `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-lg font-medium text-gray-200">
                        {device.asset_name}
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Updated: {device.last_update}
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 mr-2 rounded-xl ${
                        device.status_code === 1
                          ? "bg-green-600"
                          : device.status_code === 0
                          ? "bg-gray-600"
                          : "bg-red-600"
                      }`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div
                      className={`text-sm font-semibold font-mono text-gray-400 ${
                        device.status_code === 1
                          ? "text-green-400"
                          : device.status_code === 0
                          ? "text-gray-400"
                          : "px-1 text-red-400"
                      }`}
                    >
                      {device.status_code == 0
                        ? "Stopped"
                        : device.status_code == 1
                        ? "Running"
                        : "Error"}
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-2.5 pr-3 text-xs text-gray-400">
                    <Popover>
                      <PopoverButton className="text-white">
                        <InfoIcon size={20} />
                      </PopoverButton>
                      <PopoverPanel
                        transition
                        anchor="bottom"
                        className="mt-2 divide-y divide-white/5 rounded-xl bg-gray-700 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                      >
                        {Object.entries(device.alarm_status).map(
                          ([key, value]) => (
                            <div className="px-3 py-2 text-gray-400" key={key}>
                              {key}: {value}
                            </div>
                          )
                        )}
                      </PopoverPanel>
                    </Popover>
                  </div>
                </div>
              ))}
          </div>
        </Transition>
      </div>
      {/* Separator */}
      <div className="mt-6 border-b border-gray-700" />
      {/* UPS Systems */}
      <div className=" pl-64 text-white">
        <div className="flex items-center justify-between px-5 py-3 lg:px-10 lg:pl-5">
          <h1 className="text-2xl font-semibold">UPS Systems</h1>
          <LucideChevronsUpDown size={24} onClick={handleUpsCollapseToggle} />
        </div>
        <Transition
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300 "
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          show={upsIsCollapsed}
        >
          <div className="mx-3 pl-1 grid grid-cols-4 gap-2">
            {upsIsCollapsed &&
              upsSystems.map((device, index) => (
                <div
                  key={device.name}
                  className={`bg-gray-900 rounded-lg shadow p-3 border ${
                    device.status === "running"
                      ? "border-green-400"
                      : device.status === "stopped"
                      ? "border-gray-400"
                      : "border-red-400"
                  } `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-lg font-medium text-gray-200">
                        {device.name}
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Updated: {device.lastUpdated}
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 mr-2 rounded-xl ${
                        device.status === "running"
                          ? "bg-green-600"
                          : device.status === "stopped"
                          ? "bg-gray-600"
                          : "bg-red-600"
                      }`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div
                      className={`text-sm font-semibold font-mono text-gray-400 ${
                        device.status === "running"
                          ? "text-green-400"
                          : device.status === "stopped"
                          ? "text-gray-400"
                          : "px-1 text-red-400"
                      }`}
                    >
                      {device.status}
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-2 pr-3">
                    <InfoIcon size={20} className="text-white" />
                  </div>
                </div>
              ))}
          </div>
        </Transition>
      </div>
      {/* Separator */}
      <div className="mt-6 border-b border-gray-700" />
    </div>
  );
}

export default App;
