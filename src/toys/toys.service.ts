import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateToyDto } from './dto/CreateToy.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { CountAnimals } from './toys';

@Injectable()
export class ToysService {
  constructor(
    private readonly prismaService: PrismaService,
    @InjectRedis() private readonly redisClient: Redis,
  ) {}

  async getAllToys() {
    return await this.prismaService.toy.findMany();
  }

  async getToyById(id: number) {
    const toy = await this.prismaService.toy.findUnique({ where: { id } });
    if (!toy) throw new Error('Toy not found');
    return toy;
  }

  async getToysByAnimalId(animalId: number) {
    const animalWithToys = await this.prismaService.animal.findUnique({
      where: { id: animalId },
      include: {
        toys: true,
      },
    });

    const toys = animalWithToys?.toys || [];
    return toys;
  }
  async createToy(toy: CreateToyDto) {
    return await this.prismaService.toy.create({
      data: {
        name: toy.name,
        animals: {
          connect: toy.animals?.map((id) => ({ id })) || [],
        },
      },
    });
  }

  async addAnimalToToy(animalId: number, toyId: number) {
    const animal = await this.prismaService.animal.findUnique({
      where: { id: animalId },
    });
    if (!animal) throw new Error('Animal not found');

    const toy = await this.prismaService.toy.findUnique({
      where: { id: toyId },
    });
    if (!toy) throw new Error('Toy not found');

    await this.prismaService.animal.update({
      where: { id: animalId },
      data: { toys: { connect: { id: toyId } } },
    });

    await this.prismaService.toy.update({
      where: { id: toyId },
      data: { animals: { connect: { id: animalId } } },
    });
  }

  async countAnimalToys(animalId: number) {
    const animal = await this.prismaService.animal.findUnique({
      where: { id: animalId },
      include: { toys: true },
    });
    if (!animal) throw new Error('Animal not found');
    return { name: animal.name, count: animal.toys.length };
  }

  async countAnimalsOfToy(toyId: number) {
    const cacheKey = `countAnimalsOfToy:${toyId}`;
    const cached = await this.redisClient.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as CountAnimals;
    }

    const toy = await this.prismaService.toy.findUnique({
      where: { id: toyId },
      include: { animals: true },
    });
    if (!toy) throw new Error('Toy not found');

    const count = { name: toy.name, count: toy.animals.length };

    void this.redisClient.set(cacheKey, JSON.stringify(count), 'EX', 60);

    return count;
  }
}
