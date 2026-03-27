import admin from 'firebase-admin';

const isEmulator = process.env.NODE_ENV !== 'production';

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: 'barbershop-dev',
  });
}

const firestore = admin.firestore();
const auth = admin.auth();
const rtdb = admin.database();
const storage = admin.storage();

if (isEmulator) {
  firestore.settings({
    host: '127.0.0.1:8080',
    ssl: false,
  });

  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
  process.env.FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9000';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = '127.0.0.1:9199';
}

export { firestore, auth, rtdb, storage };
