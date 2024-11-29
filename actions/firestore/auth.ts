import { db } from "@/firebase";
import { doc, DocumentSnapshot, getDoc, Timestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Passkey, UserData } from '@/types/auth';

// check if user already exists
export const fetchUserDetailsByEmail = async (email:string): Promise<UserData | undefined> => {
  const userRef = doc(db, "users", email);
  const docSnap = await getDoc(userRef) as DocumentSnapshot<UserData>
  
  if (!docSnap.exists()) return
  const data = docSnap.data()
  return {
    ...data,
    options: data?.options ? JSON.parse(data?.options as unknown as string || '') : null,
    passKeys: data?.passKeys ? JSON.parse(data?.passKeys as unknown as string || '') : [],
  }
}

export const updateAuthNOptions = async (email: string, options: PublicKeyCredentialCreationOptionsJSON | null) => {
  const userRef = doc(db, "users", email);  
  await setDoc(userRef, {
    options: !!options ? JSON.stringify(options) : null,
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

export const addNewPasskey = async (email: string, passKey: Passkey) => {
  const userRef = doc(db, "users", email);
  const user = await fetchUserDetailsByEmail(email);
  const existingKeys = user?.passKeys || [];
  const payload = existingKeys.length ? [...existingKeys, passKey] : [passKey];
  await updateDoc(userRef, {
    passKeys: JSON.stringify(payload),
    updatedAt: Timestamp.now(),
  })
}