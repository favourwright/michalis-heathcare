import { db } from "@/firebase";
import { doc, DocumentSnapshot, getDoc, Timestamp, setDoc, updateDoc } from 'firebase/firestore';
import { Passkey, UserData } from '@/types/auth';
import { WebAuthnCredential } from "@simplewebauthn/browser";

const collectionName = "passkeys" // where to store user passkey data
// check if user already exists
export const fetchUserDetails = async (identifier:string): Promise<UserData | undefined> => {
  const userRef = doc(db, collectionName, identifier);
  const docSnap = await getDoc(userRef) as DocumentSnapshot<UserData>
  
  if (!docSnap.exists()) return
  const data = docSnap.data()
  return {
    ...data,
    passKeys: data?.passKeys ? JSON.parse(data?.passKeys as unknown as string || '') : [],
  }
}

export const addNewPasskey = async (
  {identifier, passKey, override=false}:
  {identifier: string, passKey: Passkey, override?: boolean}) => {
  const userRef = doc(db, collectionName, identifier);
  const user = await fetchUserDetails(identifier);
  const existingKeys = user?.passKeys || [];
  const payload = (existingKeys.length && !override) ? [...existingKeys, passKey] : [passKey];
  await setDoc(userRef, {
    passKeys: JSON.stringify(payload),
    updatedAt: Timestamp.now(),
  }, { merge: true });
}

export const updatePasskeyCounter = async (
  {identifier, passkeyID, newCounter}:
  {identifier: string, passkeyID: string, newCounter: number}
) => {
  const user = await fetchUserDetails(identifier);
  const updatedPasskeys = (user?.passKeys as WebAuthnCredential[])?.map(passkey => {
    if (passkey.id === passkeyID) {
      return {
        ...passkey,
        counter: newCounter,
      }
    }
    return passkey
  })
  const userRef = doc(db, collectionName, identifier);
  await updateDoc(userRef, {
    passKeys: JSON.stringify(updatedPasskeys),
    updatedAt: Timestamp.now(),
  });
}