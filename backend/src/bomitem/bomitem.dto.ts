import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBomItemDto {
  @ApiProperty({ example: 10.5 })
  quantity: number;

  @ApiPropertyOptional({ example: 'REF-123' })
  referenceCode?: string;

  @ApiProperty({ example: 'bom-uuid' })
  bomId: string;

  @ApiProperty({ example: 'material-uuid' })
  materialId: string;

  @ApiProperty({ example: 'unit-uuid' })
  unitId: string;

  @ApiProperty({ example: 'supplier-uuid' })
  supplierId: string;
}

export class UpdateBomItemDto {
  @ApiPropertyOptional({ example: 15.0 })
  quantity?: number;

  @ApiPropertyOptional({ example: 'REF-456' })
  referenceCode?: string;

  @ApiPropertyOptional({ example: 'updated-bom-id' })
  bomId?: string;

  @ApiPropertyOptional({ example: 'updated-material-id' })
  materialId?: string;

  @ApiPropertyOptional({ example: 'updated-unit-id' })
  unitId?: string;

  @ApiPropertyOptional({ example: 'updated-supplier-id' })
  supplierId?: string;
}
