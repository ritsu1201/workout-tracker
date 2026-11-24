import "../css/Header.css";
import Sidebar from "./Sidebar";
export default function Header({ location, open, setOpen }) {
  // URLに応じてヘッダーのタイトルを変更したいので変数を作る
  //   再レンダリングされるたびにHeader関数も再実行されるので変数でいい
  let pageTitle = "";
  let titleClass = "";
  if (location.pathname.startsWith("/home")) {
    pageTitle = "HOME";
    titleClass = "header-title home-title";
  } else if (location.pathname.startsWith("/form")) {
    pageTitle = "TRAINING FORM";
    titleClass = "header-title form-title";
  } else if (location.pathname.startsWith("/record")) {
    pageTitle = "TRAINING RECORD";
    titleClass = "header-title record-title";
  } else {
    pageTitle = "ACCOUNT";
    titleClass = "header-title account-title";
  }
  return (
    <>
      <header className="app-header">
        <button
          className="menu-button"
          onClick={() => setOpen(true)}
          aria-label="メニューを開く"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <span className={titleClass}>{pageTitle}</span>
      </header>
      <Sidebar open={open} setOpen={setOpen} />
    </>
  );
}
