import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import "../css/Sidebar.css";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const { loginUser, setLoginUser } = useContext(UserContext);

  return (
    <>
      { /* サイドバー外側の背景 */ }
      <div
        className={`sidebar-overlay ${open ? "active" : ""}`}
        onClick={() => {
          setOpen(false);
        }}
      />

      { /* サイドバー本体 */ }
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button
          className="sidebar-close"
          onClick={() => {
            setOpen(false);
          }}
        >
          閉じる
        </button>

        <nav className="sidebar-nav">
          <NavLink to="/form" onClick={() => setOpen(false)}>
            記録
          </NavLink>

          <NavLink to="/record" onClick={() => setOpen(false)}>
            記録一覧
          </NavLink>

          <NavLink to="/account" onClick={() => setOpen(false)}>
            アカウント設定
          </NavLink>

          <span
            onClick={() => {
              navigate("/");
              setLoginUser(null);
              localStorage.removeItem("LoginUser");
              setOpen(false);
            }}
          >
            ログアウト
          </span>
        </nav>
      </aside>
    </>
  );
}
