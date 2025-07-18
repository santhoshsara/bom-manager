import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({ example: 'admin1' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'StrongPass123!' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ enum: ['Admin', 'Designer'], example: 'Admin' })
  @IsEnum(['Admin', 'Designer'])
  role: 'Admin' | 'Designer';
}
