import { NavLink, Route, Routes } from "react-router-dom";
import { Form } from "./Components/Form/Form";
import Login from "./Components/Login/Login";
import Admin from "./Components/Admin/Admin";
import Solving from "./Components/Admin/Solving";
import HelpDeskList from "./Components/HelpDeskList/HelpDeskList";
import ViewDetails from "./Components/HelpDeskList/ViewDetails";
import SignUp from "./Components/SignUp/SignUp";
import { useContext, useState } from "react";
import { AuthContext } from "./api/userContext";
import { CiMenuKebab } from "react-icons/ci";

const App = () => {
  // context api
  const { user, logOut } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  return (
    <div className="w-screen h-screen bg-gredient overflow-hidden">
      <nav className="w-full h-16 bg-transparent text-white flex items-center justify-between px-10">
        <div className="flex items-center">
          <NavLink to="/" className="sm:text-3xl text-lg font-semibold">
            Help Desk
          </NavLink>
          <h1 className={`pl-5 ${user?.email ? " " : "hidden"}`}>
            Welcome {user?.name}
          </h1>
        </div>
        <div className="sm:flex items-center sm:visible hidden gap-5">
          <NavLink
            to="/admin"
            className={`${user?.role === "admin" ? "" : "hidden"}`}
          >
            Admin Panel
          </NavLink>
          <NavLink
            to="/list"
            className={`${user?.role === "user" ? "" : "hidden"}`}
          >
            Report
          </NavLink>
          <NavLink
            to="/login"
            className={`${
              user?.email ? "hidden" : ""
            } glass px-5 py-1 rounded font-medium`}
          >
            Login
          </NavLink>
          <div onClick={logOut}>
            <NavLink className={`${user?.email ? "" : "hidden"}`}>
              Logout
            </NavLink>
          </div>
        </div>
        {/* toggle button */}
        {user?.email ? (
          <button
            onClick={() => setOpen(!open)}
            className="size-10 glass flex items-center justify-center rounded-full sm:hidden"
          >
            <CiMenuKebab />
          </button>
        ) : (
          <NavLink
            to="/login"
            className="glass px-5 py-1 rounded font-medium sm:visible hidden"
          >
            Login
          </NavLink>
        )}
        {/* responsive menu */}
        <div
          className={`${
            open ? "visible" : "hidden"
          } absolute w-[10rem] top-16 right-5 glass flex flex-col items-center justify-center rounded`}
        >
          <NavLink
            onClick={() => setOpen(false)}
            to="/list"
            className={`w-full py-2 flex items-center justify-center text-white border-rgb font-medium border-white ${
              user?.role === "user" ? "" : "hidden"
            }`}
          >
            Report
          </NavLink>
          <NavLink
            onClick={() => setOpen(false)}
            to="/admin"
            className={`w-full py-2 flex items-center justify-center text-white border-rgb font-medium border-white ${
              user?.role === "admin" ? "" : "hidden"
            }`}
          >
            Admin Panel
          </NavLink>
          <div onClick={() => setOpen(false)} className="w-full">
            <button
              onClick={logOut}
              className="w-full py-2 text-white border-rgb font-medium border-white"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/list" element={<HelpDeskList />} />
        <Route path="/list/:id" element={<ViewDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/:id" element={<Solving />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
