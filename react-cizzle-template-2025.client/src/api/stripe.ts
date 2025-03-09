/**
 * Stripe API client for handling subscription operations
 */

/**
 * Creates a Stripe checkout session for subscription
 * @param priceId The Stripe Price ID for the subscription
 * @param customerId The customer ID (from Clerk)
 * @param customerEmail The customer's email address
 * @param token The authentication token from Clerk
 * @returns The checkout session URL
 */
export async function createCheckoutSession(
  priceId: string,
  customerId: string,
  customerEmail: string | null | undefined,
  token: string
): Promise<string> {
  const response = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      priceId,
      customerId,
      customerEmail,
      successUrl: `${window.location.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${window.location.origin}/subscription?canceled=true`,
    }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || "Failed to create checkout session");
  }

  const { url } = await response.json();
  return url;
}

/**
 * Creates a Stripe customer portal session for subscription management
 * @param customerId The customer ID (from Clerk)
 * @param token The authentication token from Clerk
 * @returns The customer portal URL
 */
export async function createPortalSession(
  customerId: string,
  token: string
): Promise<string> {
  const response = await fetch("/api/create-portal-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      customerId,
      returnUrl: `${window.location.origin}/subscription`,
    }),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || "Failed to create portal session");
  }

  const { url } = await response.json();
  return url;
}

/**
 * Fetches subscription details by session ID
 * @param sessionId The Stripe Checkout Session ID
 * @param token The authentication token from Clerk
 * @returns The subscription details
 */
export async function getSubscriptionDetails(
  sessionId: string,
  token: string
): Promise<{
  planName: string;
  nextBillingDate: string;
  subscriptionId: string;
}> {
  const response = await fetch(
    `/api/subscription-details?session_id=${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(
      errorData.message || "Failed to fetch subscription details"
    );
  }

  return await response.json();
}

/**
 * Checks if the current user has an active subscription
 * @param userId The user ID (from Clerk)
 * @param token The authentication token from Clerk
 * @returns Whether the user has an active subscription
 */
export async function checkSubscriptionStatus(
  userId: string,
  token: string
): Promise<{
  isActive: boolean;
  planId?: string;
  planName?: string;
}> {
  const response = await fetch(`/api/subscription-status?user_id=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || "Failed to check subscription status");
  }

  return await response.json();
}
