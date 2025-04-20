import { Module } from '@nestjs/common';
import { ToysService } from './toys.service';
import { ToysController } from './toys.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ToysService, PrismaService],
  controllers: [ToysController],
})
export class ToysModule {}
