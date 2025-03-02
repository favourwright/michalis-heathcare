import { auth } from "@/firebase";
import { db } from "@/firebase";
import { UserData } from "@/types/auth";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, DocumentSnapshot, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { SpecialistInfo } from "@/types/specialist";
import crypto from 'crypto';

const userColledtion = "users"; // where to store user data
const passkeyCollection = "passkeys"

export const fbSignup = async (email: string, password?: string, isSpecialist?: boolean) => {
  const pass = password || generateSecurePassword();
  const user = await createUserWithEmailAndPassword(auth, email, pass);
  const ref = doc(db, passkeyCollection, email);
  if(!isSpecialist) {
    await updateDoc(ref, {
      client: btoa(pass), // store password in base64
      updatedAt: Timestamp.now(),
    });
  }
  await sendEmailVerification(user.user);

  return user
}

const specialistCollection = "specialists"
export const saveSpecialistInfo = async (payload: Omit<SpecialistInfo, 'id' | 'createdAt' | 'updatedAt'>)=>{
  const ref = doc(db, specialistCollection, payload.email);
  await setDoc(ref, {
    ...payload,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  })
}

export const fbLogin = async (
  { email, password, isSpecialist, onSuccess }:
  { email: string, password: string, isSpecialist?: boolean, onSuccess?: () => Promise<void>}
) => {
  const cypherPass = isSpecialist ? password : atob(password)
  const userCredentials = await signInWithEmailAndPassword(auth, email, cypherPass);

  // check that user email is verified, else, logout user and throw error
  if (!userCredentials.user.emailVerified) {
    await signOut(auth);
    throw new Error("Please verify your email address");
  }

  await onSuccess?.();
  return userCredentials
}

export const fbLogout = async ({onSuccess}: {onSuccess?: () => Promise<void>}) => {
  await signOut(auth);
  await onSuccess?.();
}

export const fetchUserDetails = async (email: string) => {
  const userRef = doc(db, userColledtion, email);
  const docSnap = await getDoc(userRef) as DocumentSnapshot<UserData>
  
  if (!docSnap.exists()) return
  return docSnap.data()
}


function generateSecurePassword(length = 16) {
  return crypto.randomBytes(length).toString('base64').slice(0, length);
}

export const isCurrentUserEmailVerified = async () => {
  const userCredentials = auth.currentUser;
  if (!userCredentials) return false
  return userCredentials.emailVerified
}