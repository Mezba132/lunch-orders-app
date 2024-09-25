import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateVoteDto {
  @ApiProperty({
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  employeeId: number;

  @ApiProperty({
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  foodPackId: number;
}
