import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

// Add more valid environments
// const VALID_ENV = ['development.local', 'development', 'production'];
// const ENV = VALID_ENV.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : 'development.local';

enum Environment {
  Local = 'development.local',
  Development = 'development',
  Production = 'production',
}

// Convert the NODE_ENV to match one of the valid environments in the enum
const ENV = Object.values(Environment).includes(process.env.NODE_ENV as Environment)
  ? (process.env.NODE_ENV as Environment)
  : Environment.Local;

const ENV_FILE_PATH = `${process.cwd()}/.env.${ENV}`;
const COMMON_ENV_FILE_PATH = `${process.cwd()}/.env.common`;

// Note : dotenv gives higher precedence to variables defined in the FIRST file loaded.
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ENV_FILE_PATH, COMMON_ENV_FILE_PATH],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
