import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import { checkSubscriptionStatus } from "../api/stripe";

interface SubscriptionContextType {
  isActive: boolean;
  planId: string | undefined;
  planName: string | undefined;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const defaultContext: SubscriptionContextType = {
  isActive: false,
  planId: undefined,
  planName: undefined,
  isLoading: true,
  refetch: async () => {},
};

const SubscriptionContext =
  createContext<SubscriptionContextType>(defaultContext);

export const useSubscription = () => useContext(SubscriptionContext);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [planId, setPlanId] = useState<string | undefined>(undefined);
  const [planName, setPlanName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscriptionStatus = async () => {
    if (!isSignedIn || !user) {
      setIsActive(false);
      setPlanId(undefined);
      setPlanName(undefined);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const token = (await getToken({ template: "default" })) || "";

      if (!token) {
        console.error("Failed to get auth token");
        setIsLoading(false);
        return;
      }

      const status = await checkSubscriptionStatus(user.id, token);

      setIsActive(status.isActive);
      setPlanId(status.planId);
      setPlanName(status.planName);
    } catch (err) {
      console.error("Error fetching subscription status:", err);
      setIsActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [isSignedIn, user]);

  const value: SubscriptionContextType = {
    isActive,
    planId,
    planName,
    isLoading,
    refetch: fetchSubscriptionStatus,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}
