import { Module } from '@nestjs/common';
import { FirestoreAdminService } from './firestore-admin.service';

@Module({
  providers: [FirestoreAdminService]
})
export class FirestoreAdminModule {}
