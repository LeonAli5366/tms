/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../api/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { TicketContext } from "../../api/ticketContext";
import AdminForm from "./AdminForm";

export const Form = () => {
  // context api
  const { user } = useContext(AuthContext);
  const { ticketCount, setTicketCount } = useContext(TicketContext);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // all ref
  const nameRef = useRef();
  const emailRef = useRef();
  const issueRef = useRef();
  const desRef = useRef();

  // all functions
  const handleSubmit = (e) => {
    if (!user?.email) {
      toast.error("please login first");
      return navigate("/login");
    }
    e.preventDefault();

    const dateRow = new Date();
    const date = format(dateRow, "PP");

    console.log(date);

    const ticket = {
      title: issueRef.current.value,
      description: desRef.current.value,
      createdAt: date,
      createdBy: emailRef.current.value,
    };

    fetch("https://helpdeskticket-backend.onrender.com/api/v1/ticket/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          toast.success(data.message);
          setTicketCount(ticketCount + 1);
          navigate("/list");
        } else {
          setError(data.error);
        }
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className={`max-w-[600px] w-full px-5 mx-auto mt-10 flex flex-col items-center gap-2 ${
          user.role === "admin" ? "hidden" : ""
        }`}
      >
        <span className="sm:text-3xl text-lg text-white font-semibold pb-5">
          Help Desk
        </span>

        <span className={`text-1xl pb-5 ${user?.email ? "hidden" : ""}`}>
          you MUST login to submit ticket
        </span>

        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="name" className="text-white sm:text-lg text-sm after:content-['*'] after:pl-1">
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            defaultValue={user?.name}
            name=""
            id="name"
            className="w-full bg-transparent border sm:py-3 sm:px-3 py-2 px-2 text-white"
            required
          />
        </div>
        <div className={`w-full flex flex-col items-start gap-1 `}>
          <label htmlFor="email" className="text-white sm:text-lg text-sm after:content-['*'] after:pl-1">
            Email
          </label>
          <input
            ref={emailRef}
            type="text"
            name=""
            defaultValue={user?.email}
            id="email"
            className="w-full bg-transparent border sm:py-3 sm:px-3 py-2 px-2 text-white"
            required
          />
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="issue" className="text-white sm:text-lg text-sm after:content-['*'] after:pl-1">
            Title
          </label>
          <input
            ref={issueRef}
            type="text"
            name=""
            id="issue"
            className="w-full bg-transparent border sm:py-3 sm:px-3 py-2 px-2 text-white"
            required
          />
        </div>
        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="des" className="text-white sm:text-lg text-sm after:content-['*'] after:pl-1">
            Description
          </label>
          <textarea
            ref={desRef}
            type="text"
            name=""
            id="des"
            className="w-full bg-transparent border sm:py-3 sm:px-3 py-2 px-2 text-white"
            required
          />
        </div>
        <h1 className="text-red-600">{error}</h1>
        <button
          type="submit"
          className="bg-slate-100 hover:bg-slate-200 px-7 py-2 rounded mt-5 text-black font-medium"
        >
          Submit
        </button>
      </form>
      <div className={`${user?.role === "admin" ? "" : "hidden"}`}>
        <AdminForm></AdminForm>
      </div>
    </div>
  );
};
