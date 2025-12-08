import React from "react";
import heroBg from "../../assets/hero_friends.jpg";

const Hero1 = () => {
  return (
    <div
      className={`hero min-h-[80vh] max-w-5xl mx-auto rounded-3xl`}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay bg-pink-50/10 rounded-3xl"></div>
      <div className="hero-content text-center text-shadow-sm">
        <div className="max-w-md">
          <h1 className="mb-5 lg:text-5xl text-3xl font-bold text-pink-50">
            Find Your People. Live Your Moments.
          </h1>
          <p className="mb-5 text-pink-50">
            Whether you’re into hiking, gaming, books, coding, or simple
            hangouts— create clubs, host events, and connect with people who
            feel just like home. Build memories that go far beyond a group
            photo.
          </p>
          <button className="btn btn-primary hover:font-bold hover:underline">
            Join a Club &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
