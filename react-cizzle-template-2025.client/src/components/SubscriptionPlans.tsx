import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useUser, useAuth } from "@clerk/clerk-react";
import { createCheckoutSession, checkSubscriptionStatus } from "../api/stripe";

// Define the subscription plans
const PLANS = [
  {
    id: "monthly",
    name: "Monthly Plan",
    description: "Perfect for individuals",
    price: "$9.99",
    period: "month",
    features: [
      "Full access to all features",
      "Priority support",
      "Regular updates",
      "Cancel anytime",
    ],
    priceId: "price_monthly", // This would be your actual Stripe price ID
  },
  {
    id: "annual",
    name: "Annual Plan",
    description: "Best value for committed users",
    price: "$99.99",
    period: "year",
    features: [
      "Everything in Monthly Plan",
      "2 months free",
      "Premium support",
      "Early access to new features",
    ],
    priceId: "price_annual", // This would be your actual Stripe price ID
    isBestValue: true,
  },
];

export function SubscriptionPlans() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [activeSubscription, setActiveSubscription] = useState<{
    isActive: boolean;
    planId?: string;
    planName?: string;
  } | null>(null);
  const [isCheckingSubscription, setIsCheckingSubscription] = useState(false);

  // Check if the user is on a canceled page redirect
  const isCanceled =
    new URLSearchParams(window.location.search).get("canceled") === "true";

  // Check subscription status when the component mounts
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!isSignedIn || !user) return;

      try {
        setIsCheckingSubscription(true);
        const token = (await getToken({ template: "default" })) || "";
        if (!token) {
          console.error("Failed to get auth token");
          return;
        }

        const status = await checkSubscriptionStatus(user.id, token);
        setActiveSubscription(status);
      } catch (err) {
        console.error("Error checking subscription status:", err);
        // Don't show an error, just assume no active subscription
      } finally {
        setIsCheckingSubscription(false);
      }
    };

    fetchSubscriptionStatus();
  }, [isSignedIn, user, getToken]);

  // Function to handle subscription checkout
  const handleSubscribe = async (priceId: string, planId: string) => {
    if (!isSignedIn || !user) {
      setError("You must be logged in to subscribe");
      return;
    }

    try {
      setIsLoading({ ...isLoading, [planId]: true });
      setError(null);

      // Get the authentication token from Clerk
      const token = (await getToken({ template: "default" })) || "";
      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      const email = user.primaryEmailAddress?.emailAddress || "";

      // Create a checkout session using our API utility
      const url = await createCheckoutSession(priceId, user.id, email, token);

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      console.error("Error creating checkout session:", err);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading({ ...isLoading, [planId]: false });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Choose Your Plan
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Select the subscription that best fits your needs
        </Typography>

        {!isSignedIn && (
          <Alert severity="info" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            Please sign in to purchase a subscription
          </Alert>
        )}

        {isCanceled && (
          <Alert severity="info" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            Your checkout was canceled. You can try again when you're ready.
          </Alert>
        )}

        {activeSubscription?.isActive && (
          <Alert severity="success" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            You already have an active subscription to the{" "}
            {activeSubscription.planName} plan.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
            {error}
          </Alert>
        )}
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {PLANS.map((plan) => {
          const isActivePlan =
            activeSubscription?.isActive &&
            activeSubscription.planId === plan.priceId;

          return (
            <Grid item xs={12} sm={6} md={5} key={plan.id}>
              <Card
                elevation={4}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderRadius: 2,
                  overflow: "visible",
                  ...(plan.isBestValue
                    ? {
                        borderTop: "4px solid #1976d2",
                      }
                    : {}),
                  ...(isActivePlan
                    ? {
                        border: "2px solid #4caf50",
                      }
                    : {}),
                }}
              >
                {plan.isBestValue && (
                  <Paper
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: 20,
                      bgcolor: "#1976d2",
                      color: "white",
                      py: 0.5,
                      px: 2,
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    Best Value
                  </Paper>
                )}

                {isActivePlan && (
                  <Chip
                    label="Current Plan"
                    color="success"
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                    }}
                  />
                )}

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {plan.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                  >
                    {plan.description}
                  </Typography>
                  <Box sx={{ my: 3 }}>
                    <Typography variant="h3" component="p" color="primary">
                      {plan.price}
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{ ml: 1 }}
                      >
                        / {plan.period}
                      </Typography>
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <List>
                    {plan.features.map((feature, index) => (
                      <ListItem key={index} disableGutters sx={{ py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleOutlineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={feature} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    color={plan.isBestValue ? "primary" : "inherit"}
                    disabled={
                      !isSignedIn ||
                      isLoading[plan.id] ||
                      isCheckingSubscription ||
                      isActivePlan
                    }
                    onClick={() => handleSubscribe(plan.priceId, plan.id)}
                    sx={{ py: 1.5 }}
                  >
                    {isLoading[plan.id]
                      ? "Processing..."
                      : isActivePlan
                      ? "Current Plan"
                      : "Subscribe"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}
