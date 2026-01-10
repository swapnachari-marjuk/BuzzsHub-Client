import React from "react";
import heroBg from "../../assets/hero_onlin_friends.jpg";

const Hero2 = () => {
  return (
    <div
      className={`hero min-h-[80vh] max-w-7xl mx-auto rounded-3xl overflow-hidden`}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay bg-black-50/50"></div>
      <div className="hero-content text-center text-shadow-sm">
        <div className="max-w-md">
          <h1 className="mb-5 lg:text-5xl text-3xl font-bold text-pink-50">
            Connect Beyond Distance. Create Together.
          </h1>
          <p className="mb-5 text-pink-50 ">
            Communities aren’t limited by location. Start online clubs, plan
            virtual meetups, and bring your ideas, passions, and creativity to
            life—powered by real connections.
          </p>
          <button className="btn btn-primary lg:btn-md btn-sm">
            Discover Online Clubs &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero2;
