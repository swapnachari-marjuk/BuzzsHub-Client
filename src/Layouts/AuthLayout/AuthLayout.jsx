import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router";
import Logo from "../../Components/Logo";

const AuthLayout = () => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);

  useEffect(() => {
    const preventEsc = (e) => {
      if (e.key === "Escape") {
        console.log("clicked esc");
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", preventEsc);
  }, []);
  return (
    <div className="relative bg-pink-100 min-h-screen">
      {/* You can open the modal using document.getElementById('ID').showModal() method
      <button
        className="btn"
        onClick={() => document.getElementById("my_modal_4").showModal()}
      >
        open modal
      </button> */}
      <dialog ref={modalRef} className="modal">
        <div className="bg-pink-100 min-w-[400px] rounded-2xl px-5 py-8">
          <Logo />
          <div className="h-0.5 bg-pink-200"></div>
          <Outlet />
        </div>
      </dialog>
    </div>
  );
};

export default AuthLayout;
