import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Software Engineer',
    required: true,
  })
  @IsOptional()
  @IsString()
  designation: string;

  @ApiProperty({
    example: 705678,
    required: true,
  })
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  empId: number;

  @ApiProperty({
    example: 'O+',
    required: true,
  })
  @IsOptional()
  @IsString()
  bloodGroup: string;
}
