import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AnimalsService, PrismaService],
  controllers: [AnimalsController],
})
export class AnimalsModule {}
