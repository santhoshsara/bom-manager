import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ example: 'secret123' })
  password: string;

  @ApiProperty({ enum: Role, example: Role.Admin })
  role: Role;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'johndoe' })
  username?: string;

  @ApiPropertyOptional({ example: 'newpassword' })
  password?: string;

  @ApiPropertyOptional({ enum: Role, example: Role.Designer })
  role?: Role;
}
