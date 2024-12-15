'use client'
import { fetchUserDetails } from "@/actions/firestore/auth";
import { updateUserEmailIsVerified } from "@/actions/firestore/passkey";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import {
  useChallenge as useRegistrationChallenge,
  useVerifyChallenge as useRegistrationVerifyChallenge,
} from '@/hooks/usePasskeyRegistration';
import { signupWithPasskey } from "@/actions/passkey/register-client";

type AuthContextType = {
  currentUser: any
  userDetails: any
  isBootstrappingAuth: boolean
  isRegistrationFetching: boolean
  isRegistrationVerifying: boolean
  signup: (email: string) => Promise<any>
  // login: (email: string) => Promise<any>
  // logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { mutate: fetchRegistrationChallenge, isPending: isRegistrationFetching } = useRegistrationChallenge();
  const { mutate: verifyRegistrationChallenge, isPending: isRegistrationVerifying } = useRegistrationVerifyChallenge();
  
  const [isBootstrappingAuth, setIsBootstrappingAuth] = useState(true);
  // firebase user data: TODO: add proper type
  const [currentUser, setCurrentUser] = useState<any>(null); // basic firebase user info
  const [userDetails, setUserDetails] = useState<any>(null);

  const value:AuthContextType = {
    currentUser,
    userDetails,
    isBootstrappingAuth,
    isRegistrationFetching,
    isRegistrationVerifying,
    signup: async (email: string) => await signupWithPasskey({
      identifier: email,
      challengeFn: fetchRegistrationChallenge,
      verifyFn: verifyRegistrationChallenge
    }),
    // login: async (email: string) => await loginWithPasskey(email),
    // logout: () => fbLogout({
    //   onSuccess: async () => setUserDetails(null)
    // }),
  };

  // setup firebase state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setIsBootstrappingAuth(true);
        setCurrentUser(user);

        // fetch user details
        if (user) {
          const userDetails = await fetchUserDetails(user.email as string);
          if (userDetails) setUserDetails(userDetails);
        }
        // update email verified status if its not already true
        if (!user?.emailVerified) return
        if (userDetails?.emailVerified) return
        await updateUserEmailIsVerified(user.email as string);
      } catch (error) {
        console.log({ authStateChangeError: error });
      } finally {
        setIsBootstrappingAuth(false);
      }
    })
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};