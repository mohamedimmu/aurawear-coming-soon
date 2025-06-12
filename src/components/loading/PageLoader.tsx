import React from 'react'
import { HashLoader } from 'react-spinners';

export default function PageLoader() {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
      <HashLoader
        size={80}
        color={"#ff6900"}
        loading={true}
        speedMultiplier={1}
      />
    </div>
  );
}
