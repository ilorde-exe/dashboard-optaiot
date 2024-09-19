import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import ErrorPage from "./components/ErrorPage";
import { LucideChevronsUpDown } from "lucide-react";
import "./index.css";
import {
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { chillers, upsSystems } from "./data";

export default function App() {
  const [chillerIsCollapsed, setChillerIsCollapsed] = useState(true);
  const [upsIsCollapsed, setUpsIsCollapsed] = useState(true);
  const [latestChillerData, setLatestChillerData] = useState(null);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const previousDataRef = useRef(null);

  function showNotification(message) {
    toast.info(message, {
      autoClose: 6000,
      position: "bottom-right",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "dark",
      draggable: true,
    });
  }
  function checkForAlarmChanges(newData) {
    if (!previousDataRef.current) {
      previousDataRef.current = newData;
      return;
    }

    newData.forEach((newEntity, index) => {
      const prevEntity = previousDataRef.current[index];
      if (prevEntity) {
        Object.entries(newEntity.alarm_status).forEach(
          ([alarmKey, alarmValue]) => {
            if (alarmValue !== prevEntity.alarm_status[alarmKey]) {
              const status =
                alarmValue === "1.000000" ? "activated" : "deactivated";
              handleShowNotification(
                `${newEntity.entity_name}: ${alarmKey} ${status}`
              );
            }
          }
        );
      }
    });

    previousDataRef.current = newData;
  }

  const handleShowNotification = () => {
    showNotification("This is a test notification!");
  };

  useEffect(() => {
    const fetchChillerData = async () => {
      try {
        const response = await fetch("http://localhost:5000/events", {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const decodedChunk = decoder.decode(value, { stream: true });
          console.log("Received chunk:", decodedChunk);

          try {
            const data = JSON.parse(decodedChunk);
            if (data && data.entity_data_mapping) {
              setLatestChillerData(data.entity_data_mapping);
              checkForAlarmChanges(data.entity_data_mapping);
            }
          } catch (parseError) {
            console.error("Error parsing chiller data:", parseError);
          }
        }
      } catch (e) {
        setError(e.message);
        console.error("Error fetching chiller data:", e);
      }
    };

    fetchChillerData();
  }, []);

  if (error) return <ErrorPage error={error} />;
  if (!latestChillerData) return <Loader />;

  const initAudio = () => {
    let targetAudio = document.getElementsByClassName("audioBtn")[0];
    targetAudio.play();
  };

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

  function countChillersWithErrors(chillers) {
    return chillers.filter((chiller) => chiller.status_code === 2).length;
  }
  function countUpsWithErrors(upsSystems) {
    return upsSystems.filter((ups) => ups.status_code === 2).length;
  }
  const totalChillers = chillers.length;
  const totalUPS = upsSystems.length;
  const chillersWithErrors = countChillersWithErrors(chillers);
  const upsWithErrors = countUpsWithErrors(upsSystems);
  const allData = [totalChillers, totalUPS, chillersWithErrors, upsWithErrors];
  return (
    <div className="pb-16 min-h-screen bg-gray-800 -z-10">
      <ToastContainer />
      <Navbar
        allData={allData}
        chillerHandler={handleChillerCollapseToggle}
        upsHandler={handleUpsCollapseToggle}
        allHandler={handleAllToggle}
      />
      <div className="pt-16 pl-64 text-white">
        <div className="flex items-center justify-between px-5 py-3 lg:px-10 lg:pl-5">
          <h1 className="text-2xl font-semibold">Chillers</h1>
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            <LucideChevronsUpDown
              size={24}
              onClick={handleChillerCollapseToggle}
            />
          </button>
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
              latestChillerData.map((device) => (
                <div
                  key={device.entity_id}
                  className={`bg-gray-900 rounded-lg shadow p-3 border ${
                    device.Run_Status === "1.000000"
                      ? "border-green-400"
                      : device.Run_Status === "0.000000"
                      ? "border-gray-400"
                      : "border-red-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="text-lg font-medium text-gray-200">
                        {device.entity_name}
                      </div>
                      <div className="mt-2 text-xs text-gray-400">
                        Updated: {device.LastUpdated}
                      </div>
                    </div>
                    <div
                      className={`w-8 h-8 mr-2 rounded-xl ${
                        device.Run_Status === "1.000000"
                          ? "bg-green-600"
                          : device.Run_Status === "0.000000"
                          ? "bg-gray-600"
                          : "bg-red-600"
                      }`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div
                      className={`text-sm font-semibold font-mono text-gray-400 ${
                        device.Run_Status === "1.000000"
                          ? "text-green-400"
                          : device.Run_Status === "0.000000"
                          ? "text-gray-400"
                          : "px-1 text-red-400"
                      }`}
                    >
                      {device.Run_Status === "0.000000"
                        ? "Stopped"
                        : device.Run_Status === "1.000000"
                        ? "Running"
                        : "Error"}
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <Popover>
                      <PopoverButton className="">
                        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                          Details
                        </button>
                      </PopoverButton>
                      <PopoverPanel
                        transition
                        anchor="bottom"
                        className="mt-2 divide-y divide-white/5 rounded-xl bg-gray-700 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                      >
                        <div className="px-3 py-2">
                          {Object.entries(device.alarm_status).map(
                            ([key, value]) => (
                              <div
                                key={key}
                                className="text-sm block rounded-lg py-2 px-3 transition hover:bg-white/5"
                              >
                                <div className="flex items-center justify-between">
                                  <p className="flex justify-between pr-4 font-semibold text-white font-mono">
                                    {key}
                                  </p>
                                  <p className="text-gray-400">{`${value}`}</p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
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
          <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
            <LucideChevronsUpDown size={24} onClick={handleUpsCollapseToggle} />
          </button>
        </div>
        <Transition
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0 translate-y-6"
          enterTo="opacity-100 translate-y-0"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          show={upsIsCollapsed}
        >
          <div className="mx-3 pl-1 grid grid-cols-4 gap-2">
            {upsIsCollapsed &&
              upsSystems.map((device) => (
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
                      <div className="text-lg font-normal text-gray-200">
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
                  <div className="flex items-center text-xs text-gray-400">
                    <Popover>
                      <PopoverButton className="">
                        <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                          Details
                        </button>
                      </PopoverButton>
                      <PopoverPanel
                        transition
                        anchor="bottom"
                        className="mt-2 divide-y divide-white/5 rounded-xl bg-gray-700 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                      >
                        <div className="px-3 py-2">
                          {Object.entries(device.alarm_status).map(
                            ([key, value]) => (
                              <div
                                className="text-sm block rounded-lg py-2 px-3 transition hover:bg-white/5"
                                key={key}
                              >
                                <div className="flex items-center justify-between">
                                  <p className="flex justify-between pr-4 font-semibold text-white font-mono">
                                    {key}
                                  </p>
                                  <p className="text-gray-400">{`${value}`}</p>
                                </div>
                              </div>
                            )
                          )}
                        </div>
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
      {/* Audio */}
      <audio src="/alert.mp3" className="audioBtn"></audio>
    </div>
  );
}
