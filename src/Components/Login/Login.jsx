/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import setTokenToLocalStroge from "../SetTokenToLocal/SetTokenToLocal";
import { AuthContext } from "../../api/userContext";

const Login = () => {
  // context api
  const { setCount, count } = useContext(AuthContext);
  // all state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // all ref
  const emailRef = useRef();
  const passwordRef = useRef();

  // all functions
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log(user);
    setLoading(true);
    fetch("https://helpdeskticket-backend.onrender.com/api/v1/user/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setLoading(false);
          toast.success("User login successfully");
          navigate("/");
          setTokenToLocalStroge(data?.userData?.token);
          setCount(count + 1);
        } else {
          setLoading(false);
          setError(data?.error);
        }
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[600px] w-full px-5 mx-auto mt-10 flex flex-col items-center gap-2"
    >
      <span className="text-3xl text-white font-semibold pb-5">Login</span>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="email" className="text-white text-lg">
          Email
        </label>
        <input
          ref={emailRef}
          type="email"
          name=""
          id="email"
          className="w-full bg-transparent border py-3 px-3 text-white"
        />
      </div>
      <div className="w-full flex flex-col items-start gap-1">
        <label htmlFor="password" className="text-white text-lg">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          name=""
          id="password"
          className="w-full bg-transparent border py-3 px-3 text-white"
        />
      </div>
      <h1 className="text-red-600">{error}</h1>
      <Link to={`/signup`}>
        <h1 className="text-white mt-5 text-start">
          {`Don't have an account`}{" "}
          <span className="cursor-pointer ml-2 underline">SignUp</span>
        </h1>
      </Link>
      <h1 className="text-white mt-5 text-start">
        {`Admin email : admin@gmail.com   Admin password : 123456`}{" "}
      </h1>
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
        Login
      </button>
    </form>
  );
};

export default Login;
