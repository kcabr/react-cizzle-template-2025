import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export function SubscriptionSuccess() {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionDetails, setSubscriptionDetails] = useState<{
    planName: string;
    nextBillingDate: string;
    subscriptionId: string;
  } | null>(null);

  useEffect(() => {
    // Get the session_id from URL parameters
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId && isSignedIn) {
      fetchSubscriptionDetails(sessionId);
    } else if (!isSignedIn) {
      setError("You need to be signed in to view subscription details");
      setLoading(false);
    } else {
      setError("No subscription information found");
      setLoading(false);
    }
  }, [isSignedIn]);

  const fetchSubscriptionDetails = async (sessionId: string) => {
    try {
      const token = await getToken();

      const response = await fetch(
        `/api/subscription-details?session_id=${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subscription details");
      }

      const data = await response.json();
      setSubscriptionDetails(data);
    } catch (err) {
      console.error("Error fetching subscription details:", err);
      setError("Could not load subscription details");
    } finally {
      setLoading(false);
    }
  };

  const handleManageBilling = async () => {
    if (!isSignedIn) {
      setError("You must be logged in to manage your subscription");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerId: user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer portal session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      console.error("Error creating portal session:", err);
      setError("Could not access billing portal");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading subscription details...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button component={Link} to="/" variant="contained" color="primary">
          Return to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{ bgcolor: "primary.main", py: 3, px: 2, textAlign: "center" }}
        >
          <CheckCircleIcon sx={{ fontSize: 60, color: "white" }} />
          <Typography
            variant="h4"
            component="h1"
            sx={{ color: "white", mt: 2 }}
          >
            Subscription Successful!
          </Typography>
        </Box>

        <CardContent sx={{ py: 4, px: 3 }}>
          {subscriptionDetails ? (
            <>
              <Typography variant="h6" gutterBottom>
                Thank you for subscribing to our {subscriptionDetails.planName}{" "}
                plan!
              </Typography>
              <Typography variant="body1" paragraph>
                Your subscription is now active. You have access to all the
                premium features included in your plan.
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Next billing date: {subscriptionDetails.nextBillingDate}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Subscription ID: {subscriptionDetails.subscriptionId}
              </Typography>

              <Box
                sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}
              >
                <Button component={Link} to="/" variant="outlined">
                  Return to Home
                </Button>
                <Button
                  variant="contained"
                  onClick={handleManageBilling}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Manage Billing"}
                </Button>
              </Box>
            </>
          ) : (
            <Typography variant="body1">
              Subscription information not available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
