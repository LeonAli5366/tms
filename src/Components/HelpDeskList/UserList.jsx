/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const UserList = ({ ticket }) => {
  const { title, createdAt, createdBy, status, _id } = ticket;

  return (
    <div className="w-full border rounded bg-transparent text-white sm:px-5 sm:py-2 py-1 px-2 glass border-rgb">
      <div className="w-full h-full flex items-center justify-between bg-transparent">
        <div className="w-full flex flex-col items-center gap-1">
          <span className="text-xs sm:text-sm">CreatedAt</span>
          <span className="text-sm sm:text-base">{createdAt}</span>
        </div>
        <div className="w-full sm:flex flex-col items-center gap-1 sm:visible hidden">
          <span className="text-xs sm:text-sm">CreatedBy</span>
          <span className="text-sm sm:text-base">{createdBy}</span>
        </div>
        <div className="w-full sm:flex sm:flex-col items-center gap-1 sm:visible hidden">
          <span className="text-sm">Title</span>
          <span>{title}</span>
        </div>
        <div className="w-full flex flex-col items-center gap-1">
          <span className="text-xs sm:text-sm">Status</span>
          <span
            className={`${status === "all" ? "text-white" : ""} ${
              status === "new" ? "text-cyan-600" : ""
            } ${status === "pending" ? "text-yellow-600" : ""} ${
              status === "resolved" ? "text-green-600" : ""
            }`}
          >
            {status}
          </span>
        </div>
        <Link
          to={`/list/${_id}`}
          className="bg-transparent border-rgb w-full flex items-center justify-center sm:py-2 sm:text-base text-sm py-1 rounded"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default UserList;
