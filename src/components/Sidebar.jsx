import { NavLink, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import "../css/Sidebar.css";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const { loginUser, setLoginUser } = useContext(UserContext);

  return (
    <>
      {/* サイドバー外側の背景 */}
      <div
        className={`sidebar-overlay ${open ? "active" : ""}`}
        onClick={() => {
          setOpen(false);
        }}
      />

      {/* サイドバー本体 */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <span className="sidebar-brand-icon">WT</span>
            <span className="sidebar-brand-name">WORKOUT TRACKER</span>
          </div>

          <button
            className="sidebar-close"
            onClick={() => {
              setOpen(false);
            }}
            aria-label="メニューを閉じる"
          >
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <p className="sidebar-section-title">MENU</p>

          <NavLink to="/home/:userId" onClick={() => setOpen(false)}>
            <span className="sidebar-link-icon">⌂</span>
            HOME
          </NavLink>

          <NavLink to="/form" onClick={() => setOpen(false)}>
            <span className="sidebar-link-icon">＋</span>
            TRAINING FORM
          </NavLink>

          <NavLink to="/record" onClick={() => setOpen(false)}>
            <span className="sidebar-link-icon">▤</span>
            TRAINING RECORD
          </NavLink>

          <NavLink to="/account" onClick={() => setOpen(false)}>
            <span className="sidebar-link-icon">♙</span>
            ACCOUNT
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button
            className="sidebar-logout"
            onClick={() => {
              navigate("/");
              setLoginUser(null);
              localStorage.removeItem("LoginUser");
              setOpen(false);
            }}
          >
            <span className="sidebar-link-icon">↪</span>
            LOG OUT
          </button>
        </div>
      </aside>
    </>
  );
}
