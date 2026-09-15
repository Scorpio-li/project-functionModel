import "../App.css";
const NavBar = () => {
  return (
    <header className="navbar">
      <a href="/" className="logo">
        RUNOOB Blog
      </a>
      <nav>
        <a href="/">首页</a>
        <a href="#">关于</a>
      </nav>
    </header>
  );
};

export default NavBar;
