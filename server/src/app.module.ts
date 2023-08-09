import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { FirestoreModule } from './firestore/firestore.module';
import { FirestoredbModule } from './firestoredb/firestoredb.module';
import { FirestoreAdminModule } from './firestore-admin/firestore-admin.module';
// import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegramModule,
    WeatherModule,
    ScheduleModule.forRoot(),
    // FirestoreModule,
    FirestoreAdminModule,
    FirestoredbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
