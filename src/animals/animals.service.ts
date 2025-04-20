import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnimalDto } from './dto/CreateAnimal.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { Animal } from './animals';

@Injectable()
export class AnimalsService {
  constructor(
    private readonly prismaService: PrismaService,
    @InjectRedis() private readonly redisClient: Redis,
  ) {}

  async getAllAnimals() {
    return this.prismaService.animal.findMany();
  }

  async getAnimalById(id: number) {
    const cacheKey = `animal:${id}`;
    const cachedAnimal = await this.redisClient.get(cacheKey);

    if (cachedAnimal) {
      return JSON.parse(cachedAnimal) as Animal;
    }

    const animal = await this.prismaService.animal.findUnique({
      where: { id },
    });

    void this.redisClient.set(cacheKey, JSON.stringify(animal), 'EX', 60);

    return animal;
  }

  async createAnimal(animal: CreateAnimalDto) {
    return this.prismaService.animal.create({ data: animal });
  }
}
