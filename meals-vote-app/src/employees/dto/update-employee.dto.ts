import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsOptional()
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
  @IsOptional()
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
