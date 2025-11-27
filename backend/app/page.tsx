export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Kanchi University API
        </h1>
        <p className="text-gray-600 mb-8">
          Backend API for Kanchi University Mobile Application
        </p>
        <div className="space-x-4">
          <a
            href="/api/swagger"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
          >
            API Documentation
          </a>
          <a
            href="/admin"
            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
          >
            Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

