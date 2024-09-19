import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-300">
        Loading System Data...
      </p>
      <div className="mt-2 flex space-x-2">
        <span className="text-sm text-gray-400">Chillers</span>
        <span className="text-sm text-gray-400">•</span>
        <span className="text-sm text-gray-400">UPS</span>
      </div>
    </div>
  );
};

export default Loader;
