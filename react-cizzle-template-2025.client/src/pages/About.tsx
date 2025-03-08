import {
  Box,
  Card,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";

export function AboutPage() {
  const technologies = [
    "React 19",
    "TypeScript",
    "TanStack Router",
    "Material UI",
    "Vite",
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
        >
          About This Application
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Stack spacing={4}>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <InfoIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2" color="primary">
                  Project Overview
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                This weather forecasting application is a demonstration of
                modern React development techniques, including the use of
                TanStack Router for client-side routing and Material UI for the
                user interface. The application fetches weather forecast data
                from a backend API and presents it in a clean, user-friendly
                interface.
              </Typography>
            </Box>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CodeIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2" color="primary">
                  Technologies Used
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
                {technologies.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    color="primary"
                    variant="outlined"
                    size="medium"
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <StorageIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h5" component="h2" color="primary">
                  Data Source
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                Weather data is sourced from the project's backend API, which
                provides sample weather forecasts for demonstration purposes.
                The data is fetched asynchronously and displayed in a tabular
                format on the Weather page.
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Card sx={{ p: 3, backgroundColor: "#f5f9ff" }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            This project was created as a demonstration of integrating TanStack
            Router with Material UI in a React application. It showcases a
            responsive design with multiple page routes and data fetching
            capabilities.
          </Typography>
        </Card>
      </Box>
    </Box>
  );
}
