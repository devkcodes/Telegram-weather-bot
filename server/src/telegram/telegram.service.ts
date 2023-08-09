import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WeatherService } from 'src/weather/weather.service';
import { Cron } from '@nestjs/schedule';
import { FirestoreAdminService } from '../firestore-admin/firestore-admin.service';
import { FirestoredbService } from 'src/firestoredb/firestoredb.service';

// console.log(Cron.toString());
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
  private readonly bot: any;
  firestore = this.firestoreAdminService.getFirestore();
  private readonly botToken: string;
  private disclaimer: string;

  constructor(
    private readonly configservice: ConfigService,
    private readonly weatherservice: WeatherService,
    private readonly firestoreAdminService: FirestoreAdminService,
    private readonly fs: FirestoredbService,
  ) {
    this.botToken = configservice.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(this.botToken, { polling: true });
    fs.getUsers();

    this.bot.on('polling_error', console.log);
    this.bot.on('message', (msg) => {
      this.commands(msg);
    });
    this.disclaimer =
      '\n\n\nBot commands :\n /subscribe [cityname] - subscribe and set city\n /setcity [cityname] - update city post subscription\n /unsubscribe - unsubscribe\n ';
  }

  private commands(msg) {
    // console.log(msg);

    const chatId = msg.chat.id;
    const message = msg;
    const text = msg.text;

    if (text === '/getuser') {
      this.fs.getUsers();
    }
    if (text === '/start') {
      this.start(chatId);
    }
    if (text === '/unsubscribe') {
      this.unsubscribe(chatId);
    }
    if (text.split(' ')[0] === '/subscribe') {
      this.subscribe(chatId, message);
    }
    if (text.split(' ')[0] === '/setcity') {
      this.setCity(chatId, message);
    }
  }

  private start(chatId) {
    const startMessage = 'Welcome to Weather bot.  ' + this.disclaimer;
    this.bot.sendMessage(chatId, startMessage);
  }

  //unsubscribe
  private async unsubscribe(chatId) {
    const res = await this.fs.checkUser(`${chatId}`);
    console.log('res', res);
    if (!res) {
      this.bot.sendMessage(chatId, "you're not subscribed to Weather bot");
    } else {
      this.fs.deleteUser(`${chatId}`);
      this.bot.sendMessage(
        chatId,
        'Successfully unsubscribed from Weather bot',
      );
    }
  }

  //subscribe
  private async subscribe(chatId, message) {
    const city = message.text.split(' ')[1];

    if (city === undefined) {
      this.bot.sendMessage(chatId, 'Invalid command format');
      return;
    }

    const resCheckCity = this.checkCity(city, chatId);
    if (!resCheckCity) {
      return;
    }

    const resCheckUser = await this.fs.checkUser(`${chatId}`);
    if (!resCheckUser) {
      const user = {
        id: chatId,
        firstname: message.from.first_name,
        lastname: message.from.last_name,
        city: city,
      };
      console.log(message);
      this.fs.addUser(user);
      this.bot.sendMessage(chatId, "you've been successfully subscribed");
    } else {
      this.bot.sendMessage(
        chatId,
        "You're already subscribed. If you want to change city, use the /setcity command",
      );
    }
  }

  //setcity
  private async setCity(chatId, message) {
    const newCity = message.text.split(' ')[1];

    if (newCity === undefined) {
      this.bot.sendMessage(chatId, 'Invalid command format');
      return;
    }

    const resCheckUser = await this.fs.checkUser(`${chatId}`);

    if (!resCheckUser) {
      this.bot.sendMessage(chatId, 'Please subscribe first');
      return;
    }

    const resCheckCity = this.checkCity(newCity, chatId);

    if (resCheckCity) {
      const user = {
        id: chatId,
        firstname: message.from.first_name,
        lastname: message.from.last_name,
        city: newCity,
      };
      this.fs.updateUser(user);

      this.bot.sendMessage(chatId, 'City successfully updated');
    }
  }

  //check city exists
  async checkCity(city: string, id: number) {
    const weatherData = await this.weatherservice.getWeather(city);

    if (weatherData.error && weatherData.error.code === 1006) {
      this.bot.sendMessage(
        id,
        `The city "${city}" was not found. Please check the city name and try again.`,
      );
      return false;
    } else return true;
  }

  //daily update
  @Cron('3 * * * * *')
  async sendDailyWeatherUpdates() {
    const users = await this.fs.getUsers();

    users.forEach(async (user) => {
      const chatId = user.id;
      const city = user.city;

      const weatherData = await this.weatherservice.getWeather(city);
      console.log(weatherData.data);
      if (weatherData.isError) {
        console.log(weatherData);
        //Handle server error
        this.bot.sendMessage(
          chatId,
          'An error occurred while fetching weather data. Please try again later.',
        );
        //Continue to the next subscriber
      } else {
        const forecast = weatherData.forecast.forecastday[0].day;
        const dailyForecast =
          `Good Morning! Here's your daily forecast for ${weatherData.location.name} :\n The temperature today will range from $ ${forecast.maxtemp_c}°C to ${forecast.mintemp_c}°C with an average of ${forecast.avgtemp_c}°C.\n There is ${forecast.daily_chance_of_rain}% chance of rain with precipitation of around ${forecast.totalprecip_mm} mm and humidity of ${forecast.avghumidity}%. Have a great day!	` +
          this.disclaimer;

        this.bot.sendMessage(chatId, dailyForecast);
      }
    });
  }
}
