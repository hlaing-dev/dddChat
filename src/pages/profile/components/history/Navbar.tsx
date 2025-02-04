import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  isEditMode: boolean;
  onEditClick: () => void;
  darkmode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  isEditMode,
  onEditClick,
  darkmode,
}) => {
  return (
    <div
      className={`flex fixed top-0 w-full z-10 b  justify-between items-center p-2 pr-5 ${
        darkmode ? "bg-[#161619]" : "bg-white"
      }`}
    >
      <Link to="/profile" className="back-button">
        {darkmode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.828 11.0002H20V13.0002H7.828L13.192 18.3642L11.778 19.7782L4 12.0002L11.778 4.22217L13.192 5.63617L7.828 11.0002Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.828 11.0002H20V13.0002H7.828L13.192 18.3642L11.778 19.7782L4 12.0002L11.778 4.22217L13.192 5.63617L7.828 11.0002Z"
              fill="#080808"
            />
          </svg>
        )}
      </Link>
      <div className={`${darkmode ? "history-title_dark" : "history-title"}`}>观看历史</div>
      <div className={`${darkmode ? "edit-title_dark" : "edit-title"}`} onClick={onEditClick}>
        {isEditMode ? "取消" : "编辑"}
      </div>
    </div>
  );
};

export default Navbar;
