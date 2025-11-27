import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (projectId && privateKey && clientEmail) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          privateKey,
          clientEmail,
        }),
      });
    }
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export const firebaseAdmin = admin.apps.length > 0 ? admin : null;

export async function sendPushNotification(
  tokens: string[],
  title: string,
  body: string,
  data?: Record<string, string>
) {
  if (!tokens.length) return { successCount: 0, failureCount: 0, responses: [] };
  
  if (!firebaseAdmin) {
    console.warn('Firebase Admin not initialized. Push notifications disabled.');
    return { successCount: 0, failureCount: tokens.length, responses: [] };
  }

  const message = {
    notification: {
      title,
      body,
    },
    data: data || {},
    tokens,
  };

  try {
    const response = await firebaseAdmin.messaging().sendEachForMulticast(message);
    return {
      successCount: response.successCount,
      failureCount: response.failureCount,
      responses: response.responses,
    };
  } catch (error) {
    console.error('Error sending push notification:', error);
    throw error;
  }
}

