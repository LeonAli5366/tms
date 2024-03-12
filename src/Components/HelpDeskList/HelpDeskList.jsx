/* eslint-disable no-unused-vars */
import { useContext } from "react";
import UserList from "./UserList";
import { TicketContext } from "../../api/ticketContext";

const HelpDeskList = () => {
  const { tickets, loading, setFilter, filter } = useContext(TicketContext);
  console.log(tickets);
  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <span className="sm:text-3xl text-lg text-white pb-5">Ticket List </span>
      <div className="w-full flex justify-end pr-4">
      <select
        className={`select border-rgb rounded ${filter === "all" ? "bg-transparent" : ""} ${
          filter === "new" ? "bg-cyan-600" : ""
        } ${filter === "pending" ? "bg-yellow-600" : ""} ${
          filter === "solved" ? "bg-green-600" : ""
        }`}
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      >
        <option value="all" className="bg-white">
          All
        </option>
        <option value="new" className="bg-cyan-600">
          New
        </option>
        <option value="pending" className="bg-yellow-600">
          Pending
        </option>
        <option value="solved" className="bg-green-600">
          Solved
        </option>
      </select>
      </div>
      <div className="w-full grid gap-5 pl-2 overflow-y-scroll pb-24 hidden-scrollbar">
        {loading ? (
          <>
            <h1>Loading...</h1>
          </>
        ) : (
          <>
            {tickets.length < 1 ? (
              <div>
                <h1 className="text-white text-lg sm:text-3xl text-center">
                  No Ticket found. 
                  Please reload this page to view.
                </h1>
              </div>
            ) : (
              <>
                {tickets?.map((ticket) => (
                  <UserList key={ticket._id} ticket={ticket}></UserList>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HelpDeskList;
