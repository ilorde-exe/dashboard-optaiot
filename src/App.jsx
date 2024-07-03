import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { LucideChevronsUpDown } from "lucide-react";
import "./index.css";

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
  const chillers = [
    { name: "Chiller 1", status: "running", lastUpdated: "10:30:45" },
    {
      name: "Chiller 2",
      status: "stopped",
      lastUpdated: "10:30:44",
    },
    {
      name: "Chiller 3",
      status: "error",
      lastUpdated: "10:30:47",
    },
    { name: "Chiller 4", status: "running", lastUpdated: "10:30:48" },
  ];
  const upsSystems = [
    { name: "UPS 1", status: "running", lastUpdated: "10:30:48" },
    {
      name: "UPS 2",
      status: "stopped",
      lastUpdated: "10:30:45",
    },
    {
      name: "UPS 3",
      status: "error",
      lastUpdated: "10:30:49",
    },
    {
      name: "UPS 4",
      status: "error",
      lastUpdated: "10:30:49",
    },
    {
      name: "UPS 5",
      status: "running",
      lastUpdated: "10:30:41",
    },
    {
      name: "UPS 6",
      status: "running",
      lastUpdated: "10:30:40",
    },
    {
      name: "UPS 7",
      status: "stopped",
      lastUpdated: "10:30:45",
    },
  ];
  const totalChillers = chillers.length;
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
        <div className="px-2 pl-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {chillerIsCollapsed &&
            chillers.map((device, index) => (
              <div
                key={device.name}
                className={`bg-gray-900 rounded-lg shadow p-4 ${
                  index % 3 === 0 &&
                  index != 0 &&
                  index != 3 &&
                  index != 6 &&
                  index != 9 &&
                  index != 12 &&
                  index != 15 &&
                  index != 18 &&
                  index != 21 &&
                  index != 24 &&
                  index != 27 &&
                  index != 30
                    ? "col-span-3"
                    : ""
                } border ${
                  device.status === "running"
                    ? "border-green-400"
                    : device.status === "stopped"
                    ? "border-gray-400"
                    : "border-red-400"
                } `}
              >
                <div className="flex items-center justify-between text-lg font-medium text-gray-200">
                  {device.name}
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
                <div className="flex items-center justify-end mt-2">
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
                <div className="mt-2 text-xs text-gray-400">
                  Last updated {device.lastUpdated}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* UPS Systems */}
      <div className="pt-6 pl-64 text-white">
        <div className="flex items-center justify-between px-5 py-3 lg:px-10 lg:pl-5">
          <h1 className="text-2xl font-semibold">UPS Systems</h1>
          <LucideChevronsUpDown size={24} onClick={handleUpsCollapseToggle} />
        </div>
        <div className=" px-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {upsIsCollapsed &&
            upsSystems.map((device, index) => (
              <div
                key={device.name}
                className={`bg-gray-900 rounded-lg shadow p-4 ${
                  index % 3 === 0 &&
                  index != 0 &&
                  index != 3 &&
                  index != 6 &&
                  index != 9 &&
                  index != 12 &&
                  index != 15 &&
                  index != 18 &&
                  index != 21 &&
                  index != 24 &&
                  index != 27 &&
                  index != 30
                    ? "col-span-3"
                    : ""
                } border ${
                  device.status === "running"
                    ? "border-green-400"
                    : device.status === "stopped"
                    ? "border-gray-400"
                    : "border-red-400"
                }`}
              >
                <div className="flex items-center justify-between text-lg font-medium text-gray-200">
                  {device.name}
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
                <div className="flex items-center justify-end mt-2">
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
                <div className="mt-2 text-xs text-gray-400">
                  Last updated {device.lastUpdated}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
