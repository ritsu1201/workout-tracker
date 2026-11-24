import { Route, Routes } from "react-router";
import { UserContext } from "./context/UserContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import IsRegister from "./pages/IsRegister";
import Form from "./pages/Form";
import Record from "./pages/Record";
import Account from "./pages/Account";
import NotFound from "./components/NotFound";
import MainLayout from "./layouts/MainLayout";
import { useState } from "react";
export default function App() {
  // アプリ起動後、App関数実行時点でユーザー情報を取得したいので初期値に関数を設定
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });
  // 現在のログインユーザーを管理
  // リロードしてもログインユーザーを取得したいので、初期値で取得する
  const [loginUser, setLoginUser] = useState(() => {
    return JSON.parse(localStorage.getItem("LoginUser")) || null;
  });

  return (
    <>
      <UserContext.Provider
        value={{ users, setUsers, loginUser, setLoginUser }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/isRegister" element={<IsRegister />} />
          <Route element={<MainLayout />}>
            <Route path="/home/:userId" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/record" element={<Record />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}
