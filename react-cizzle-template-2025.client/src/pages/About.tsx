import "../styles/About.css";

export function AboutPage() {
  return (
    <div className="about-page">
      <h1>About This Application</h1>
      <div className="about-content">
        <section className="about-section">
          <h2>Project Overview</h2>
          <p>
            This weather forecasting application is a demonstration of modern
            React development techniques, including the use of TanStack Router
            for client-side routing. The application fetches weather forecast
            data from a backend API and presents it in a clean, user-friendly
            interface.
          </p>
        </section>

        <section className="about-section">
          <h2>Technologies Used</h2>
          <ul className="tech-list">
            <li>React 19</li>
            <li>TypeScript</li>
            <li>TanStack Router</li>
            <li>Vite</li>
            <li>CSS Modules</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Data Source</h2>
          <p>
            Weather data is sourced from the project's backend API, which
            provides sample weather forecasts for demonstration purposes.
          </p>
        </section>
      </div>
    </div>
  );
}
