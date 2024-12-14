import { AuthenticationResponseJSON, AuthenticatorTransportFuture, CredentialDeviceType, RegistrationResponseJSON, WebAuthnCredential } from '@simplewebauthn/browser';
import { Timestamp } from 'firebase/firestore';

export type UserData = {
  email: string
  emailVerified?: boolean
  name: string
  passKeys: PublicKeyCredentialRequestOptionsJSON[] | WebAuthnCredential[]
  options: PublicKeyCredentialCreationOptions
  updatedAt: Timestamp
}

export type Passkey = {
  // SQL: Store as `TEXT`. Index this column
  id: string;
  // SQL: Store raw bytes as `BYTEA`/`BLOB`/etc...
  //      Caution: Node ORM's may map this to a Buffer on retrieval,
  //      convert to Uint8Array as necessary
  publicKey: Uint8Array;
  // SQL: Foreign Key to an instance of your internal user model
  user: UserData['email'];
  // SQL: Store as `TEXT`. Index this column. A UNIQUE constraint on
  //      (webAuthnUserID + user) also achieves maximum user privacy
  webauthnUserID: string;
  // SQL: Consider `BIGINT` since some authenticators return atomic timestamps as counters
  counter: number;
  // SQL: `VARCHAR(32)` or similar, longest possible value is currently 12 characters
  // Ex: 'singleDevice' | 'multiDevice'
  deviceType: CredentialDeviceType;
  // SQL: `BOOL` or whatever similar type is supported
  backedUp: boolean;
  // SQL: `VARCHAR(255)` and store string array as a CSV string
  // Ex: ['ble' | 'cable' | 'hybrid' | 'internal' | 'nfc' | 'smart-card' | 'usb']
  transports?: AuthenticatorTransportFuture[];
};

export type PreferredAuthNIdentifierTypes = 'email' | 'username'
export type Identifier = {
  type: PreferredAuthNIdentifierTypes
  value: string
}
export type RegistrationChallengeVerifiicationDTO = {
  identifier: Identifier
  response: RegistrationResponseJSON
  overridePasskeys?: boolean
}
export type AuthenticationChallengeVerifiicationDTO = {
  identifier: Identifier
  response: AuthenticationResponseJSON
}