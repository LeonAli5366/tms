/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../../api/userContext";
import toast from "react-hot-toast";
import setTokenToLocalStroge from "../SetTokenToLocal/SetTokenToLocal";

const AdminForm = () => {
  const { user, count, setCount } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const oldPassword = form.oldPassword.value;

    const adminInfo = {
      name,
      email,
      password,
      oldPassword,
    };

    const token = localStorage.getItem("token");
    setLoading(true)
    fetch("https://helpdeskticket-backend.onrender.com/api/v1/user/update", {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(adminInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setLoading(false)
          toast.success(data?.message);
          setCount(count + 1);
          setTokenToLocalStroge(data.token);
        } else {
          setLoading(false)
          setError(data.error);
        }
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[600px] w-full px-5 mx-auto mt-10 flex flex-col items-center gap-2"
    >
      <span className="sm:text-3xl text-lg text-white font-semibold pb-5">
        Update Admin Info
      </span>

      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="name" className="text-white sm:text-lg text-sm after:content-['*'] after:pl-1">
          Name
        </label>
        <input
          type="text"
          defaultValue={user?.name}
          name="name"
          className="w-full bg-transparent border sm:py-3 sm:px-3 py-2 px-2 text-white"
          required
        />
      </div>
      <div className={`w-full flex flex-col items-start gap-1 `}>
        <label htmlFor="email" className="text-white sm:text-lg text-sm after:content-['*'] after:pl-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          defaultValue={user?.email}
          className="w-full bg-transparent border sm:py-3 sm:px-3 py-2 px-2 text-white"
          required
        />
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="password" className="text-white sm:text-lg text-sm after:content-['*'] after:pl-1">
          Old Password
        </label>
        <input
          type="password"
          name="oldPassword"
          className="w-full bg-transparent border sm:py-3 sm:px-3 py-2 px-2 text-white"
          required
        />
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="password" className="text-white sm:text-lg text-sm after:content-['*'] after:pl-1">
          New Password
        </label>
        <input
          type="password"
          name="password"
          className="w-full bg-transparent border sm:py-3 sm:px-3 py-2 px-2 text-white"
          required
        />
      </div>
      <h1 className="text-red-600">{error}</h1>
      <button
        disabled={loading === true}
        type="submit"
        className="bg-slate-100 hover:bg-slate-200 px-7 disabled:bg-[#64748b] disabled:cursor-not-allowed py-2 rounded mt-5 text-black font-medium gap-2 flex items-center"
      >
        {loading === true ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          ""
        )}
        Update
      </button>
    </form>
  );
};

export default AdminForm;
