const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black ">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-blue-700">404</h1>
        {/* Title */}
        <h2 className="text-3xl font-semibold text-gray-400 mt-6">
          Page Not Found
        </h2>
        {/* Description */}
        <p className="text-gray-500 mt-4">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        {/* Go Back Button */}
        <div className="mt-6">
          <a
            href="/"
            className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-300"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
