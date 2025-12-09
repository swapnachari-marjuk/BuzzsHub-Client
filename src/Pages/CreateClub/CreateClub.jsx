import React from "react";
import { Navigate } from "react-router";
import useRole from "../../hooks/useRole";
import ComponentLoading from "../../Components/ComponentLoading";

const CreateClub = () => {
  const { userRole, isLoading } = useRole();
  console.log(userRole, "from create club");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ComponentLoading />
      </div>
    );
  }

  if (userRole?.role === "user") {
    return <Navigate to="/becomeManager" />;
  }

  if (userRole?.role === "club_manager") {
    return (
      <form>
        <div>
          <label>User Name</label>
          <input type="text" />
        </div>
      </form>
    );
  }
};

export default CreateClub;
