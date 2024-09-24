import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Layout = ({ children }) => {
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8001/user/userId/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        //console.log(res.data);
        setUser(res.data.user);
        //console.log(user);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    navigate("/login");
  };

  return (
    <div className="flex flex-col w-[100%] min-h-[100vh]">
      <nav className=" flex gap-6 items-center px-8 w-full h-[80px] shadow-md bg-blue-500">
        <h2 className="text-2xl font-bold">
          <Link to={"/home"}>Dealsdray</Link>
        </h2>
        <span className="flex-1"></span>
        <Link to={"/home"} className="hover:text-white">
          Home
        </Link>
        <Link to={"/employeesList"} className="hover:text-white">
          Employee List
        </Link>
        <span className="flex-1"></span>
        <h2 className="text-white font-medium">{user?.fullName}</h2>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md py-2 px-4 bg-white shadow-md"
        >
          Logout
        </button>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
