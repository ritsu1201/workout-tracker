import { useParams } from "react-router";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import "../css/Home.css";

export default function Home() {
  const { userId } = useParams();
  const { loginUser, setLoginUser } = useContext(UserContext);
  return (
    <header className="home-header">
      {loginUser === null ? (
        <p className="home-header__loading">読み込み中...</p>
      ) : (
        <div className="home-header__content">
          <h2 className="home-header__title">
            こんにちは {loginUser.userName}さん!!
          </h2>
          <p className="home-header__message">
            今日もトレーニングを頑張りましょう！！
          </p>
        </div>
      )}
    </header>
  );
}
