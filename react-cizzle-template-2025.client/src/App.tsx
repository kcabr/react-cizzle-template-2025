import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

interface Forecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

function App() {
  const [forecasts, setForecasts] = useState<Forecast[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    populateWeatherData();
  }, []);

  async function populateWeatherData() {
    try {
      const response = await fetch("weatherforecast");
      if (response.ok) {
        const data = await response.json();
        setForecasts(data);
      } else {
        setError(true);
      }
    } catch {
      // Ignore the specific error but set error state to true
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (error || !forecasts) {
      return (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="body1" color="error">
            <em>
              Loading... Please refresh once the ASP.NET backend has started.
              See{" "}
              <Link href="https://aka.ms/jspsintegrationreact" target="_blank">
                https://aka.ms/jspsintegrationreact
              </Link>{" "}
              for more details.
            </em>
          </Typography>
        </Box>
      );
    }

    return (
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-labelledby="tableLabel">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Temp. (C)</TableCell>
              <TableCell>Temp. (F)</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forecasts.map((forecast) => (
              <TableRow
                key={forecast.date}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {forecast.date}
                </TableCell>
                <TableCell>{forecast.temperatureC}</TableCell>
                <TableCell>{forecast.temperatureF}</TableCell>
                <TableCell>{forecast.summary}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ mb: 1, fontWeight: "bold" }}
        >
          Weather Forecast
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          This component demonstrates fetching data from the server.
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
}

export default App;
