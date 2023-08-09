import { Test, TestingModule } from '@nestjs/testing';
import { FirestoredbService } from './firestoredb.service';

describe('FirestoredbService', () => {
  let service: FirestoredbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirestoredbService],
    }).compile();

    service = module.get<FirestoredbService>(FirestoredbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
