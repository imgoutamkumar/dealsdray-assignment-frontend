import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* const employeesList = [
  {
    id: 1,
    image: "",
    fullName: "Mohan",
    email: "mohan@gmail.com",
    mobileNo: "5487963210",
    designation: "HR",
    gender: "Male",
    course: ["BCA", "MCA"],
    createdDate: "24-09-2024",
  },
  {
    id: 2,
    image: "",
    fullName: "Rahul",
    email: "rahul@gmail.com",
    mobileNo: "5487963210",
    designation: "HR",
    gender: "Male",
    course: ["BCA", "MCA", "BSC"],
    createdDate: "24-09-2024",
  },
  {
    id: 3,
    image: "",
    fullName: "Shreya",
    email: "shreya@gmail.com",
    mobileNo: "5487963210",
    designation: "Sales",
    gender: "Female",
    course: ["MCA"],
    createdDate: "24-09-2024",
  },
]; */

const EmployeesList = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8001/employee/search?page=${page}&search=${search}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        setSearchData(res.data);
        console.log(searchData);
      })
      .catch((err) => console.log(err));
  }, [search, page]);

  //const totalPages = Math.ceil(searchData.length / 5);

  useEffect(() => {
    axios
      .get(`http://localhost:8001/employee/allEmployees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setData(res.data.employees))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleCreateEmployee = () => {
    navigate("/createEmployee");
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleEdit = (e, employeeId) => {
    navigate(`/updateEmployee/${employeeId}`);
  };

  const handleDelete = (e, employeeId) => {
    console.log(employeeId);
    axios.delete(`http://localhost:8001/employee/delete/${employeeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  };

  return (
    <div className="w-full flex flex-col p-8">
      <div className="flex w-full justify-end items-center pb-4 gap-3">
        <span>
          Total Count : <span className="font-bold">{data?.length}</span>
        </span>
        <button
          className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleCreateEmployee}
        >
          Create employee
        </button>
      </div>
      <div className="flex w-full justify-end items-center pb-4 gap-3">
        <span>Search</span>
        <input
          className="w-[500px] px-2 border rounded-md py-2"
          placeholder="search..."
          type="text"
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="box-border w-full border border-gray-300 bg-white rounded-lg shadow overflow-y-auto">
        <table className="w-full text-center">
          <thead>
            <tr className="font-semibold text-gray-500 h-[70px]">
              <th>Unique Id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No.</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((employee, index) => (
              <tr key={index + 1} className="h-[60px]">
                <td>{index + 1}</td>
                <td>{employee.image}</td>
                <td>{employee.fullName}</td>
                <td>{employee.email}</td>
                <td>{employee.mobileNo}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course}</td>
                <td>{employee.createdAt}</td>
                <td className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={(e) => handleEdit(e, employee._id)}
                    className="cursor-pointer text-green-600 rounded-md py-1 px-2 border-2 border-gray-500 bg-green-500 bg-opacity-30"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, employee._id)}
                    className="cursor-pointer text-red-600 rounded-md py-1 px-2 border-2 border-gray-500 bg-red-500 bg-opacity-30"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div> Pages : </div>
    </div>
  );
};

export default EmployeesList;
