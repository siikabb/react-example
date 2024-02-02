import {Link, Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header>
        <h1>My Art App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Copyright 2024</footer>
    </>
  );
};

export default Layout;
