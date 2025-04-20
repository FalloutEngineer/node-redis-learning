import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ToysModule } from './toys/toys.module';

@Module({
  imports: [
    AnimalsModule,
    PrismaModule,
    RedisModule.forRoot({ type: 'single', url: process.env.REDIS_URL }),
    ToysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
