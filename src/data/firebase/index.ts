import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../serviceAccountKey.json';

initializeApp({
  credential: cert(serviceAccount as unknown as string)
});

export const db = getFirestore();