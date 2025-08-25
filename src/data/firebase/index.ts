import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import serviceAccount from '../../../serviceAccountKey.json';

initializeApp({
  credential: cert(serviceAccount as unknown as string)
});

export const db = getFirestore();