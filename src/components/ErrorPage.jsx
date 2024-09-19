export default function ErrorPage({ error }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-red-400">
        <h1 className="text-2xl font-semibold text-red-500">Error</h1>
        <p className="mt-4 text-gray-400">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-transparent border border-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          Reload
        </button>
      </div>
    </div>
  );
}
