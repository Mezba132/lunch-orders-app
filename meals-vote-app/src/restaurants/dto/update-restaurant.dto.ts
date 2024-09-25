import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRestaurantDto {
  @ApiProperty({
    type: String,
    example: 'Shultan Dine',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    example: ' Quantum Emerald Point, Gareeb-e-Nawaz Ave, Dhaka 1230',
  })
  @IsOptional()
  @IsString()
  address?: string;
}
