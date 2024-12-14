import { auth } from "@/firebase";
import { db } from "@/firebase";
import { UserData } from "@/types/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, DocumentSnapshot, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import crypto from 'crypto';

const userColledtion = "users"; // where to store user data
const passkeyCollection = "passkeys"

export const fbSignup = async (email: string) => {
  const password = generateSecurePassword();
  const user = await createUserWithEmailAndPassword(auth, email, password);
  const ref = doc(db, passkeyCollection, email);
  await updateDoc(ref, {
    client: btoa(password), // store password in base64
    updatedAt: Timestamp.now(),
  });

  return user
}

export const fbLogin = async (
  { email, password, onSuccess }:
  { email: string, password: string, onSuccess?: () => Promise<void>}
) => {
  const user = await signInWithEmailAndPassword(auth, email, atob(password));
  // const userRef = doc(db, userColledtion, email);
  // await updateDoc(userRef, {
  //   email,
  //   updatedAt: Timestamp.now(),
  // });

  await onSuccess?.();
  return user
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