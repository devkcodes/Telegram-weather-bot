import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [WeatherService, ConfigService],
})
export class WeatherModule {}
