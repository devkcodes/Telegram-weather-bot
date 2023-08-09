import { Test, TestingModule } from '@nestjs/testing';
import { FirestoreAdminService } from './firestore-admin.service';

describe('FirestoreAdminService', () => {
  let service: FirestoreAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirestoreAdminService],
    }).compile();

    service = module.get<FirestoreAdminService>(FirestoreAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
