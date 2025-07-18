import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMaterialDto {
  @ApiProperty({ example: 'Steel Rod' })
  name: string;

  @ApiProperty({ example: 'MAT-001' })
  code: string;

  @ApiPropertyOptional({ example: 'Raw Material' })
  type?: string;
}

export class UpdateMaterialDto {
  @ApiPropertyOptional({ example: 'Updated Material' })
  name?: string;

  @ApiPropertyOptional({ example: 'MAT-002' })
  code?: string;

  @ApiPropertyOptional({ example: 'Finished Good' })
  type?: string;
}
