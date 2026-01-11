import React from "react";

const ComponentLoading = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:max-w-7xl justify-center mx-auto">
      {[...Array(12)].map((_, i) => <div key={i} className="flex w-52 flex-col gap-4">
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>)}
    </div>
  );
};

export default ComponentLoading;
