import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({
    type: String,
    example: 'Kacchi Bhai',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'Gareeb-e-Nawaz Ave, Dhaka 1230',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
