"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">40eeee4</h1>
        <p className="text-xl text-gray-600 mb-4">Oopxxxxxs! Page not found</p>
        <Link href="/" className="text-red-500 hover:text-red-700 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
