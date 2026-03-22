import * as admin from 'firebase-admin';
import { auth } from 'firebase-functions/v2';

export const onUserCreate = auth.user().onCreate(async (user) => {
  // Set default custom claims for new users
  const customClaims = {
    role: 'viewer',
    createdAt: new Date().toISOString(),
  };

  try {
    await admin.auth().setCustomUserClaims(user.uid, customClaims);
    console.log(`Custom claims set for user ${user.uid}: ${JSON.stringify(customClaims)}`);
  } catch (error) {
    console.error(`Error setting custom claims for user ${user.uid}:`, error);
  }
});
