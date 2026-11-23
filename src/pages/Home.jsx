import { useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/Home.css";

export default function Home() {
  const { userId } = useParams();
  const { loginUser, setLoginUser } = useContext(UserContext);
  // サイドバーの開閉
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header
        userId={userId}
        loginUser={loginUser}
        setLoginUser={setLoginUser}
      />

      <button
        className="menu-button"
        onClick={() => {
          setOpen(true);
        }}
      >
        開く
      </button>

      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}

function Header({ userId, loginUser, setLoginUser }) {
  return (
    <>
      {loginUser === null ? (
        <p>読み込み中...</p>
      ) : (
        <>
          <h2>こんにちは {loginUser.userName}さん!!</h2>
          <p>今日もトレーニングを頑張りましょう！！</p>
        </>
      )}
    </>
  );
}
