import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";
import DevicesIcon from "@mui/icons-material/Devices";
import BarChartIcon from "@mui/icons-material/BarChart";

export function HomePage() {
  const theme = useTheme();

  const features = [
    {
      title: "Real-time Data",
      description:
        "View up-to-date weather information fetched from a backend API.",
      icon: <CloudIcon fontSize="large" color="primary" />,
    },
    {
      title: "Clean UI",
      description:
        "Experience a clean and responsive user interface built with React and Material UI.",
      icon: <DevicesIcon fontSize="large" color="primary" />,
    },
    {
      title: "Modern Routing",
      description: "Navigate seamlessly between pages with TanStack Router.",
      icon: <BarChartIcon fontSize="large" color="primary" />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          color="primary"
          sx={{
            fontWeight: "bold",
            mb: 3,
          }}
        >
          Welcome to the Weather App
        </Typography>
        <Typography
          variant="h5"
          component="p"
          color="text.secondary"
          sx={{
            maxWidth: "800px",
            mx: "auto",
            mb: 6,
            lineHeight: 1.6,
          }}
        >
          This is a simple weather application that demonstrates the use of
          TanStack Router with React and Material UI. Check out the Weather tab
          to see current weather forecasts.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
                elevation={3}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "center", p: 3 }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
