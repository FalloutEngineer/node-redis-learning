import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  color: string;

  @IsNumber()
  @ApiProperty()
  legs: number;

  @IsString()
  @ApiProperty()
  sound: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty()
  toyIds?: number[];
}
