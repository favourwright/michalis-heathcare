'use client'
import { fbLogout, fetchSpecialistDetails, fetchUserDetails } from "@/actions/firestore/auth";
import { updateUserEmailIsVerified } from "@/actions/firestore/passkey";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, ReactNode, useEffect, useState } from "react"
import {
  useChallenge as useRegistrationChallenge,
  useVerifyChallenge as useRegistrationVerifyChallenge,
} from '@/hooks/usePasskeyRegistration';
import {
  useChallenge as useAuthenticationChallenge,
  useVerifyChallenge as useAuthenticationVerifyChallenge,
} from '@/hooks/usePasskeyVerification';
import { signupWithPasskey } from "@/actions/passkey/register-client";
import { loginWithPasskey } from "@/actions/passkey/authenticate-client";
import { useToast } from "@/hooks/use-toast";
import useGetStartedStore from "@/stores/get-started";
import useUserStore from "@/stores/user"

type AuthContextType = {
  currentUser: any
  userDetails: any
  isBootstrappingAuth: boolean
  isRegistrationFetching: boolean
  isRegistrationVerifying: boolean
  isLoginFetching: boolean
  isLoginVerifying: boolean
  signup: (email: string) => Promise<any>
  login: (email: string) => Promise<any>
  logout: () => Promise<any>
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
  // registration
  const { mutate: fetchRegistrationChallenge, isPending: isRegistrationFetching } = useRegistrationChallenge();
  const { mutate: verifyRegistrationChallenge, isPending: isRegistrationVerifying } = useRegistrationVerifyChallenge();

  // login
  const { mutate: fetchLoginChallenge, isPending: isLoginFetching } = useAuthenticationChallenge();
  const { mutate: verifyLoginChallenge, isPending: isLoginVerifying } = useAuthenticationVerifyChallenge();
  
  const [isBootstrappingAuth, setIsBootstrappingAuth] = useState(true);
  // firebase user data: TODO: add proper type
  const [currentUser, setCurrentUser] = useState<any>(null); // basic firebase user info
  const [userDetails, setUserDetails] = useState<any>(null);

  // toast hook
  const { toast } = useToast()
  const { closeModal, setProcessing, reset: resetGetStarted } = useGetStartedStore()
  const { setUId, setEmail, updateIsVerified, reset: resetUser, setIsSpecialist } = useUserStore()

  const value:AuthContextType = {
    currentUser,
    userDetails,
    isBootstrappingAuth,
    isRegistrationFetching,
    isRegistrationVerifying,
    isLoginFetching,
    isLoginVerifying,
    signup: async (email: string) => await signupWithPasskey({
      identifier: email,
      challengeFn: fetchRegistrationChallenge,
      verifyFn: verifyRegistrationChallenge,
      onSuccess: async (message) => {
        // show success message
        toast({ title: 'success', description: message });
        closeModal(); // close "get started" modal
        setProcessing(false)
      },
      onError: async (error) => {
        // show error message
        toast({ title: 'error', description: error?.message || 'An error occurred, please try again' });
        setProcessing(false)
      }
    }),
    
    login: async (email: string) => await loginWithPasskey({
      identifier: email,
      challengeFn: fetchLoginChallenge,
      verifyFn: verifyLoginChallenge,
      onSuccess: async (message) => {
        // show success message
        toast({ title: 'success', description: message });
        closeModal(); // close "get started" modal
        setProcessing(false)
      },
      onError: async (error) => {
        // show error message
        toast({ title: 'error', description: error?.message || 'An error occurred, please try again' });
        setProcessing(false)
      }
    }),
    logout: async () => await fbLogout({
      onSuccess: async () => {
        setUserDetails(null)
        resetGetStarted()
        resetUser()
      }
    }),
  };

  // setup firebase state change listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        setIsBootstrappingAuth(true);
        setCurrentUser(user);

        // fetch user details
        if (user) {
          setUId(user.uid);
          setEmail(user.email as string);
          updateIsVerified(user.emailVerified);

          const userDetails = await fetchUserDetails(user.email as string);
          if (userDetails) setUserDetails(userDetails);
          else {
            const specialistDetails = await fetchSpecialistDetails(user.email as string);
            if (specialistDetails) setIsSpecialist(true);
          }
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