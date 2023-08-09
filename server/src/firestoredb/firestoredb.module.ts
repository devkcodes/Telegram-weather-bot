import { Module } from '@nestjs/common';
import { FirestoredbService } from './firestoredb.service';
import { FirestoreAdminService } from 'src/firestore-admin/firestore-admin.service';
@Module({
  controllers: [],
  providers: [FirestoredbService, FirestoreAdminService],
})
export class FirestoredbModule {}
