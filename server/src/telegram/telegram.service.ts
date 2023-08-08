import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherService } from 'src/weather/weather.service';
import { Cron } from '@nestjs/schedule';

// console.log(Cron.toString());
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
  private readonly bot: any;
  public data: [any];
  private dataJSON: { subscribers: any[] } = { subscribers: [] };
  private readonly botToken: string;
  private subscribers: Set<number> = new Set();
  private cities: Map<number, string> = new Map();
  private disclaimer: string;
  constructor(
    private readonly configservice: ConfigService,
    private readonly weatherservice: WeatherService,
  ) {
    this.botToken = configservice.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(this.botToken, { polling: true });
    this.sendDailyWeatherUpdates();
    this.bot.on('polling_error', console.log);

    this.bot.on('message', (msg) => {
      this.commands(msg);
    });
    this.disclaimer =
      '\n\n\nBot commands :\n /subscribe [cityname] - subscribe and set city\n /setcity [cityname] - update city post subscription\n /unsubscribe - unsubscribe\n ';
  }

  private updateDataJSON(
    id: number,
    firstName: string,
    lastName: string,
    city: string,
  ) {
    const subscriberIndex = this.dataJSON.subscribers.findIndex(
      (subscriber) => subscriber.id === id,
    );

    if (subscriberIndex === -1) {
      // New subscriber, add to the list
      this.dataJSON.subscribers.push({
        id,
        firstname: firstName,
        lastname: lastName,
        city,
      });
    } else {
      // Existing subscriber, update city
      this.dataJSON.subscribers[subscriberIndex].city = city;
    }
  }

  private commands(msg: any) {
    console.log(msg);
    // console.log(this.cities);
    const chatId = msg.chat.id;
    const message = msg.text;
    //start
    if (message === '/start') {
      const startMessage = 'Welcome to Weather bot.  ' + this.disclaimer;
      this.bot.sendMessage(chatId, startMessage);
    }
    //unsubscribe
    if (message === '/unsubscribe') {
      if (!this.subscribers.has(chatId)) {
        this.bot.sendMessage(chatId, "you're not subscribed to Weather bot");
      } else {
        this.subscribers.delete(chatId);
        this.cities.delete(chatId);
        this.bot.sendMessage(
          chatId,
          'Successfully unsubscribed from Weather bot',
        );
      }
    }
    //subscribe
    if (message.split(' ')[0] === '/subscribe') {
      const newCity = message.split(' ')[1];

      if (newCity === undefined) {
        this.bot.sendMessage(chatId, 'Invalid command format');
      } else if (!this.checkCity(msg, newCity, chatId)) {
        console.log('error');
      } else if (!this.subscribers.has(chatId)) {
        this.subscribers.add(chatId);
        this.cities.set(chatId, newCity);
        this.bot.sendMessage(chatId, "you've been successfully subscribed");
      } else {
        this.bot.sendMessage(
          chatId,
          "You're already subscribed. If you want to change city, use the /setcity command",
        );
      }
    }

    //update city
    if (message.split(' ')[0] === '/setcity') {
      const newCity = message.split(' ')[1];

      if (newCity === undefined) {
        this.bot.sendMessage(chatId, 'Invalid command format');
      } else if (!this.subscribers.has(chatId)) {
        this.bot.sendMessage(chatId, 'Please subscribe first');
      } else if (!this.checkCity(msg, newCity, chatId)) {
        console.log('error');
      } else {
        this.cities.set(chatId, newCity);
        // this.data.forEach();
        this.bot.sendMessage(chatId, 'City successfully updated');
      }
    }
  }

  async checkCity(message: any, city: string, id: number) {
    const weatherData = await this.weatherservice.getWeather(city);
    if (weatherData.error && weatherData.error.code === 1006) {
      this.bot.sendMessage(
        id,
        `The city "${city}" was not found. Please check the city name and try again.`,
      );
      return true;
    } else {
      // Update JSON data with new city
      this.updateDataJSON(
        id,
        message.from.first_name,
        message.from.last_name,
        city,
      );
      console.log(this.dataJSON);
      return false;
    }
  }

  //
  //daily update
  @Cron('3 * * * * *')
  sendDailyWeatherUpdates() {
    this.subscribers.forEach(async (chatId) => {
      if (this.cities.has(chatId)) {
        const city = this.cities.get(chatId);
        const weatherData = await this.weatherservice.getWeather(city);
        // console.log(weatherData.data);
        if (weatherData.isError) {
          // Handle server error
          this.bot.sendMessage(
            chatId,
            'An error occurred while fetching weather data. Please try again later.',
          );
          // Continue to the next subscriber
        } else {
          const forecast = weatherData.forecast.forecastday[0].day;
          const dailyForecast =
            `Good Morning! Here's your daily forecast for ${weatherData.location.name} :\n The temperature today will range from $ ${forecast.maxtemp_c}°C to ${forecast.mintemp_c}°C with an average of ${forecast.avgtemp_c}°C.\n There is ${forecast.daily_chance_of_rain}% chance of rain with precipitation of around ${forecast.totalprecip_mm} mm and humidity of ${forecast.avghumidity}%. Have a great day!	` +
            this.disclaimer;
          // const weatherDescription = weatherData.weather[0].description;
          // const message = `Good morning! Here's the weather update for today in ${city}:\n${weatherDescription}`;
          this.bot.sendMessage(chatId, dailyForecast);
        }
      }
    });
  }
}
