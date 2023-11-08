import Logo from "../images/logo.svg";
function Header() {
  return (
    <header className="header" id="main">
      <a className="link" href="#main">
        <img className="header__logo" src={Logo} alt="логотип место" />
      </a>
    </header>
  );
}

export default Header;
