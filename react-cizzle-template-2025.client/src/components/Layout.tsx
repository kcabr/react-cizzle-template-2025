import { Link, Outlet } from "@tanstack/react-router";
import "../styles/Layout.css";

export function Layout() {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo">React Weather App</div>
        <nav className="nav">
          <ul>
            <li>
              <Link
                to="/"
                className={({ isActive }: { isActive: boolean }) =>
                  isActive ? "active" : ""
                }
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/weather"
                className={({ isActive }: { isActive: boolean }) =>
                  isActive ? "active" : ""
                }
              >
                Weather
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={({ isActive }: { isActive: boolean }) =>
                  isActive ? "active" : ""
                }
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} React Weather App</p>
      </footer>
    </div>
  );
}
