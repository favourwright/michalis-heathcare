import { db } from "@/firebase";
import { doc, DocumentSnapshot, getDoc, Timestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Passkey, UserData } from '@/types/auth';

// check if user already exists
export const fetchUserDetails = async (identifier:string): Promise<UserData | undefined> => {
  const userRef = doc(db, "users", identifier);
  const docSnap = await getDoc(userRef) as DocumentSnapshot<UserData>
  
  if (!docSnap.exists()) return
  const data = docSnap.data()
  return {
    ...data,
    passKeys: data?.passKeys ? JSON.parse(data?.passKeys as unknown as string || '') : [],
  }
}

export const addNewPasskey = async (identifier: string, passKey: Passkey) => {
  const userRef = doc(db, "users", identifier);
  const user = await fetchUserDetails(identifier);
  const existingKeys = user?.passKeys || [];
  const payload = existingKeys.length ? [...existingKeys, passKey] : [passKey];
  await setDoc(userRef, {
    passKeys: JSON.stringify(payload),
    updatedAt: Timestamp.now(),
  }, { merge: true });
}