import logo from "../images/logo.svg";
function Header() {
  return (
    <header className="header" id="main">
      <a className="link" href="#main">
        <img className="header__logo" src={logo} alt="логотип место" />
      </a>
    </header>
  );
}

export default Header;
