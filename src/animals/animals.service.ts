import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnimalDto } from './dto/CreateAnimal.dto';

@Injectable()
export class AnimalsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAnimals() {
    return this.prismaService.animal.findMany();
  }

  async getAnimalById(id: number) {
    return this.prismaService.animal.findUnique({ where: { id } });
  }

  async createAnimal(animal: CreateAnimalDto) {
    return this.prismaService.animal.create({ data: animal });
  }
}
