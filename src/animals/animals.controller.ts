import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAnimalDto } from './dto/CreateAnimal.dto';
import { AnimalsService } from './animals.service';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  async getAllAnimals() {
    return await this.animalsService.getAllAnimals();
  }

  @Get(':id')
  async getAnimalById(@Param('id') id: string) {
    const numberId = Number(id);

    if (Number.isNaN(numberId)) throw new Error('Invalid number ID');

    return await this.animalsService.getAnimalById(numberId);
  }

  @Post()
  async createAnimal(@Body() animal: CreateAnimalDto) {
    return await this.animalsService.createAnimal(animal);
  }
}
