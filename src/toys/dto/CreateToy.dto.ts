import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateToyDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty({ type: [Number] })
  animals?: number[];
}
