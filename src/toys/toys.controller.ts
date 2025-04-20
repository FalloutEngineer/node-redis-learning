import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ToysService } from './toys.service';
import { AddAnimalToToyDto } from './dto/AddAnimalToToy.dto';
import { CreateToyDto } from './dto/CreateToy.dto';
import Redis from 'ioredis';
import { CountAnimals } from './toys';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Controller('toys')
export class ToysController {
  constructor(
    private readonly toyService: ToysService,
    @InjectRedis() private readonly redisClient: Redis,
  ) {}

  @Get()
  getAllToys() {
    return this.toyService.getAllToys();
  }

  @Get(':id')
  getToyById(@Param('id') id: string) {
    const numberId = Number(id);
    if (Number.isNaN(numberId)) throw new Error('Invalid number ID');

    return this.toyService.getToyById(numberId);
  }

  @Get('animal/:id')
  getToysByAnimalId(@Param('id') animalId: string) {
    const numberAnimalId = Number(animalId);
    if (Number.isNaN(numberAnimalId))
      throw new Error('Invalid number Animal ID');
    return this.toyService.getToysByAnimalId(numberAnimalId);
  }

  @Get('animal/count/:id')
  conutAnimalToys(@Param('id') animalId: string) {
    const numberAnimalId = Number(animalId);
    if (Number.isNaN(numberAnimalId))
      throw new Error('Invalid number Animal ID');
    return this.toyService.countAnimalToys(numberAnimalId);
  }

  @Get('countAnimals/:id')
  async countAnimalsOfToy(@Param('id') toyId: string) {
    const cacheKey = `countAnimalsOfToy:${toyId}`;
    const cached = await this.redisClient.get(cacheKey);

    if (cached) {
      return JSON.parse(cached) as CountAnimals;
    }

    const numberToyId = Number(toyId);
    if (Number.isNaN(numberToyId)) throw new Error('Invalid number Toy ID');

    const count = this.toyService.countAnimalsOfToy(numberToyId);
    await this.redisClient.set(cacheKey, JSON.stringify(count), 'EX', 60);

    return count;
  }

  @Post()
  createToy(@Body() toy: CreateToyDto) {
    return this.toyService.createToy(toy);
  }

  @Post('addAnimalToToy')
  addAnimalToToy(@Body() dto: AddAnimalToToyDto) {
    return this.toyService.addAnimalToToy(dto.animalId, dto.toyId);
  }
}
