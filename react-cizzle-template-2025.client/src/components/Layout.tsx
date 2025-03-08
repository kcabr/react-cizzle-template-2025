import { useState } from "react";
import { Link as RouterLink, Outlet } from "@tanstack/react-router";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import InfoIcon from "@mui/icons-material/Info";

interface NavItem {
  text: string;
  path: string;
  icon: JSX.Element;
}

const navItems: NavItem[] = [
  { text: "Home", path: "/", icon: <HomeIcon /> },
  { text: "Weather", path: "/weather", icon: <WbSunnyIcon /> },
  { text: "About", path: "/about", icon: <InfoIcon /> },
];

const drawerWidth = 240;

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Weather App
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              sx={{
                textAlign: "center",
                "&.active": {
                  backgroundColor: "rgba(25, 118, 210, 0.12)",
                },
              }}
            >
              <Box sx={{ mr: 1 }}>{item.icon}</Box>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: "block" }}
          >
            React Weather App
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: "#fff",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  "&.active": {
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                  },
                }}
              >
                {item.icon}
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Container component="main" sx={{ mt: 3, mb: 3, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            &copy; {new Date().getFullYear()} React Weather App
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
