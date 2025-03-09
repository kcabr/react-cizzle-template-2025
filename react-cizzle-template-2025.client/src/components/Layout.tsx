import { useState } from "react";
import { Link as RouterLink, Outlet } from "@tanstack/react-router";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
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
import CardMembershipIcon from "@mui/icons-material/CardMembership";

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { text: "Home", path: "/", icon: <HomeIcon /> },
  { text: "Weather", path: "/weather", icon: <WbSunnyIcon /> },
  { text: "Subscription", path: "/subscription", icon: <CardMembershipIcon /> },
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
      <AppBar position="static" sx={{ width: "100%" }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
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
            <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ borderRadius: 2 }}
                  >
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </Box>
          </Toolbar>
        </Container>
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
      <Container
        component="main"
        maxWidth="lg"
        sx={{ mt: 3, mb: 3, flexGrow: 1, px: { xs: 2, sm: 3 } }}
      >
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
          width: "100%",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body1" align="center">
            &copy; {new Date().getFullYear()} React Weather App
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
