import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-primary rounded-2xl text-pink-50 p-10">
      <nav>
        <h6 className="font-bold">Discover</h6>
        <a className="link link-hover">Communities</a>
        <a className="link link-hover">Events</a>
        <a className="link link-hover">Topics</a>
        <a className="link link-hover">Make Friends</a>
      </nav>
      <nav>
        <Link
          to="/"
          className="cursor-pointer group flex justify-center items-center "
        >
          <span className="font-bold transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-95 group-hover:translate-y-1">
            Buzz's<span className="text-[#f7e0e5]">Hub</span>
          </span>
          <span className="link link-hover relative -left-16  transition-all ease-in opacity-0 group-hover:opacity-100">
            Home
          </span>
        </Link>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Jobs</a>
        <a className="link link-hover">Press kit</a>
      </nav>
      <nav>
        <h6 className="font-bold">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a
            target="_blank"
            href="https://www.facebook.com/ahmad.marjuk.869863"
          >
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/facebook-new.png"
              alt="facebook-new"
            />
          </a>

          <a target="_blank" href="https://www.linkedin.com/in/ahmad-marjuk/">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/linkedin-circled--v1.png"
              alt="linkedin"
            />
          </a>

          <a className="cursor-pointer">
            <img
              width="24"
              height="24"
              src="https://img.icons8.com/ios/50/circled-x.png"
              alt="twitterx"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
