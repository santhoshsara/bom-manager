import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUnitDto {
  @ApiProperty({ example: 'Kilogram' })
  name: string;

  @ApiProperty({ example: 'kg' })
  shortName: string;
}

export class UpdateUnitDto {
  @ApiPropertyOptional({ example: 'Gram' })
  name?: string;

  @ApiPropertyOptional({ example: 'g' })
  shortName?: string;
}
