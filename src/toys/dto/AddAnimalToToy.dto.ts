import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class AddAnimalToToyDto {
  @IsNumber()
  @ApiProperty()
  animalId: number;
  @IsNumber()
  @ApiProperty()
  toyId: number;
}
