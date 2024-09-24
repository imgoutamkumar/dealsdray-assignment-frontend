import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeesList from "./pages/EmployeesList";
import UpdateEmployee from "./pages/UpdateEmployee";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"login"} />}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route
        path="home"
        element={
          <Layout>
            <Dashboard></Dashboard>
          </Layout>
        }
      ></Route>
      <Route
        path="createEmployee"
        element={
          <Layout>
            <CreateEmployee></CreateEmployee>
          </Layout>
        }
      ></Route>
      <Route
        path="employeesList"
        element={
          <Layout>
            <EmployeesList></EmployeesList>
          </Layout>
        }
      ></Route>
      <Route
        path="updateEmployee/:Id"
        element={
          <Layout>
            <UpdateEmployee></UpdateEmployee>
          </Layout>
        }
      ></Route>
    </Routes>
  );
}

export default App;
