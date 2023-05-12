import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { AdvertsModule } from './adverts/adverts.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.cwd() + '/.env'
  }), SharedModule, AdvertsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
