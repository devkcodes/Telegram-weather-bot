import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { ConfigService } from '@nestjs/config';
import { WeatherService } from 'src/weather/weather.service';

@Module({
  providers: [TelegramService, ConfigService, WeatherService],
})
export class TelegramModule {}
