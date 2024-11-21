import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) { }

  getHello(): string {
    // Using '@nestjs/config' both methods are available to access environment variables
    console.log(
      `Dotenv : ${process.env.NODE_PORT}`, // Direct access using process.env
      `Config : ${this.config.get<number>('NODE_PORT')}`, // Access using ConfigService **recommended**
    );
    return `This application is running on: ${this.config.get<number>('NODE_PORT')}`;
  }
}
