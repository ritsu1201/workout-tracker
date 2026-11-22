import { Route, Routes } from "react-router";
import { UserContext } from "./context/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import IsRegister from "./pages/IsRegister";
import NotFound from "./components/NotFound";
import { useEffect, useState } from "react";
export default function App() {
  const [users, setUsers] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  useEffect(() => {
    const newUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(newUsers);
  }, []);
  return (
    <>
      <UserContext.Provider
        value={{ users, setUsers, loginUser, setLoginUser }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home/:userId" element={<Home />} />
          <Route path="/isRegister" element={<IsRegister />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}
