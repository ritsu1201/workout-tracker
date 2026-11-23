import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router";
import "../css/isRegister.css";

export default function IsRegister() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // ユーザー名が重複した場合画面を更新して警告を出したいので
  const [isUserNameTaken, setIsUserNameTaken] = useState(false);
  const navigate = useNavigate();
  const { users, setUsers, loginUser, setLoginUser } = useContext(UserContext);

  function userNameInput(e) {
    return setUserName(e.target.value.replace(/[ 　]/g, ""));
  }

  function passwordInaput(e) {
    return setPassword(e.target.value.replace(/[ 　]/g, ""));
  }

  return (
    <main className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h2>Create Account</h2>
          <p>新規アカウントを作成</p>
        </div>

        <div className="register-form">
          <div className="register-group">
            <label className="register-label">ユーザー名</label>
            <input
              className="register-input"
              type="text"
              placeholder="ユーザー名"
              value={userName}
              onChange={(e) => {
                userNameInput(e);
                setIsUserNameTaken(false);
              }}
            />
            {userName.trim() === "" && (
              <p className="register-error">ユーザー名が入力されていません</p>
            )}
          </div>

          <div className="register-group">
            <label className="register-label">パスワード</label>
            <input
              className="register-input"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={passwordInaput}
            />
            {password.trim() === "" && (
              <p className="register-error">パスワードを登録してください</p>
            )}
          </div>

          <button
            className="register-button"
            onClick={() => {
              const isUserNameTaken = users.some((user) => {
                return user.userName === userName;
              });
              if (isUserNameTaken) {
                setIsUserNameTaken(true);
              } else {
                // ログインユーザーを取得してloginUserに代入したいので追加するユーザー情報を変数に代入
                const NewUser = { id: crypto.randomUUID(), userName, password };
                // Reactの再レンダリングを待たずに最新のusersを保存したいので変数に代入
                const NewUsers = [...users, NewUser];
                //   Reactに変更を知らせる。
                // 更新用関数はReactに変更を知らせる役割で戻り値はundefind
                setUsers(NewUsers);
                // ログインユーザーを入れる
                setLoginUser(NewUser);
                localStorage.setItem("LoginUser", JSON.stringify(NewUser));
                localStorage.setItem("users", JSON.stringify(NewUsers));
                navigate(`/home/${NewUser.id}`);
              }
            }}
            disabled={userName.trim() === "" || password.trim() === ""}
          >
            アカウントを作成
          </button>
          {isUserNameTaken && (
            <div className="register-alert" role="alert">
              <span className="register-alert-icon">!</span>
              <div className="register-alert-content">
                <strong>登録できませんでした</strong>
                <p>このユーザー名はすでに使用されています。</p>
              </div>
            </div>
          )}
          <div className="register-footer">
            <p>すでにアカウントをお持ちですか？</p>
            <button
              className="register-login-button"
              onClick={() => {
                navigate("/");
              }}
            >
              ログインへ戻る
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
