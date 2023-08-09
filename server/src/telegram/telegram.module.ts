import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import { WeatherService } from 'src/weather/weather.service';
import { TelegramController } from './telegram.controller';
import { FirestoreAdminService } from 'src/firestore-admin/firestore-admin.service';
import { FirestoredbService } from 'src/firestoredb/firestoredb.service';

@Module({
  providers: [
    TelegramService,
    ConfigService,
    WeatherService,
    FirestoreAdminService,
    FirestoredbService,
  ],
  controllers: [TelegramController],
})
export class TelegramModule {}
