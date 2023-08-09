import * as admin from 'firebase-admin';
import * as path from 'path';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class FirestoreAdminService {
  private readonly firestore: FirebaseFirestore.Firestore;

  constructor() {
    const serviceAccount = require(path.resolve(
      __dirname,
      '../../telegram-app-2f7f4-firebase-adminsdk-snrh5-3f22dcb908.json',
    ));
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }

    this.firestore = admin.firestore();
  }

  getFirestore() {
    return this.firestore;
  }
}
