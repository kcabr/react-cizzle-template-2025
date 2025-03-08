import "../styles/Home.css";

export function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to the Weather App</h1>
      <p>
        This is a simple weather application that demonstrates the use of
        TanStack Router with React. Check out the Weather tab to see current
        weather forecasts.
      </p>
      <div className="feature-cards">
        <div className="feature-card">
          <h3>Real-time Data</h3>
          <p>View up-to-date weather information fetched from a backend API.</p>
        </div>
        <div className="feature-card">
          <h3>Clean UI</h3>
          <p>
            Experience a clean and responsive user interface built with React.
          </p>
        </div>
        <div className="feature-card">
          <h3>Modern Routing</h3>
          <p>Navigate seamlessly between pages with TanStack Router.</p>
        </div>
      </div>
    </div>
  );
}
