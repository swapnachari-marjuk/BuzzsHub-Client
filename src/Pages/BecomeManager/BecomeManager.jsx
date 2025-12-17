import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const BecomeManager = () => {
  const { user } = useAuth();
  const { userRole, refetch } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleManageManager = (e) => {
    e.preventDefault();
    const user_Role = e.target.user_role.value.toLowerCase();
    if (user_Role === "manager") {
      axiosSecure
        .patch("/users", { role: user_Role, email: user?.email })
        .then(async (res) => {
          console.log(res);
          if (res.data.modifiedCount) {
            await refetch();
            toast.success("Approved your request!");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong.");
        });
    } else {
      toast.error("To request, select the option Manager.");
    }
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl ">
        <h3 className="font-bold text-center  mt-4 -mb-3 mx-3 text-pink-500">
          To create a club, you need to become a manager.
        </h3>
        <form onSubmit={handleManageManager} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Name"
                defaultValue={user?.displayName}
                readOnly
              />
            </div>

            {/* email */}
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                defaultValue={user?.email}
                readOnly
              />
            </div>

            {/* Role */}
            <div>
              <label className="label">Role</label>
              <select
                defaultValue=""
                className="select select-secondary"
                name="user_role"
              >
                <option value="" disabled>
                  Select The Option Manager
                </option>
                <option disabled={true}>{userRole?.role.toUpperCase()}</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <button className="btn btn-primary mt-4">Become A Manager</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default BecomeManager;
