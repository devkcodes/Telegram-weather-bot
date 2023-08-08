import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class WeatherService {
  private readonly apiUrl = 'https://api.weatherapi.com/v1/forecast.json';
  private readonly api_key: string;
  // const readonly api_key =
  constructor(private readonly configService: ConfigService) {
    this.api_key = configService.get<string>('WEATHER_API_KEY');
  }

  async getWeather(city: string) {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          key: this.api_key,
          q: city,
        },
      });
      return response.data;
    } catch (error) {
      return {
        isError: true,
        error: error.response?.data?.error || 'Unknown error occurred',
      };
    }
  }
}
