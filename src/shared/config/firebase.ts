import admin from 'firebase-admin';

const app = admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      projectId: 'barbershop-dev',
    });

const firestore = admin.firestore();
const auth = admin.auth();

// 🔥 CONFIGURAR EMULATORS
if (process.env.NODE_ENV !== 'production') {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
  process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080';
  process.env.FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9000';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = '127.0.0.1:9199';

  firestore.settings({
    host: '127.0.0.1:8080',
    ssl: false,
  });
}

export { app, admin, firestore, auth };
