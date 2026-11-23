import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import "../css/login.css";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // アカウントが見つからなかった時に画面を更新したい
  const [isAccountNotFound, setIsAccountNotFound] = useState(false);
  const navigate = useNavigate();
  const { users, setUsers, loginUser, setLoginUser } = useContext(UserContext);

  function userNameInput(e) {
    return setUserName(e.target.value.replace(/[ 　]/g, ""));
  }

  function passwordInput(e) {
    return setPassword(e.target.value.replace(/[ 　]/g, ""));
  }

  return (
    <main className="login-page">
      <div className="login-card">
        <Header />

        <div className="login-form">
          <div className="login-group">
            <label className="login-label">ユーザー名</label>
            <input
              className="login-input"
              type="text"
              placeholder="ユーザー名"
              value={userName}
              onChange={(e) => {
                userNameInput(e);
                setIsAccountNotFound(false);
              }}
            />
            {userName.trim() === "" && (
              <p className="login-error">ユーザー名が入力されていません</p>
            )}
          </div>
          <div className="login-group">
            <label className="login-label">パスワード</label>
            <input
              className="login-input"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => {
                passwordInput(e);
                setIsAccountNotFound(false);
              }}
            />
            {password.trim() === "" && (
              <p className="login-error">パスワードが入力されていません</p>
            )}
          </div>
          <button
            className="login-button"
            onClick={() => {
              const user = users.find((user) => {
                return user.userName === userName && user.password === password;
              });

              if (user) {
                setLoginUser(user);
                localStorage.setItem("LoginUser", JSON.stringify(user));
                navigate(`/home/${user.id}`);
              } else {
                setIsAccountNotFound(true);
              }
            }}
            disabled={userName.trim() === "" || password.trim() === ""}
          >
            Login
          </button>
          {isAccountNotFound && (
            <div className="login-alert" role="alert">
              <span className="login-alert-icon">!</span>
              <div className="login-alert-content">
                <strong>ログインできませんでした</strong>
                <p>ユーザー名またはパスワードを確認してください。</p>
              </div>
            </div>
          )}
          <div className="login-footer">
            <p>アカウントをお持ちでない場合</p>
            <button
              className="login-register-button"
              onClick={() => {
                navigate("/isRegister");
              }}
            >
              新規登録
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <div className="login-header">
      <h2>Welcome Back</h2>
      <p>ログインしてください</p>
    </div>
  );
}
