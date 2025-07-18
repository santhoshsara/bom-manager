import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBomDto {
  @ApiProperty({ example: 'BOM A' })
  name: string;

  @ApiProperty({ type: String, format: 'date-time', example: '2025-07-15T00:00:00.000Z' })
  effectiveFrom: Date;

  @ApiProperty({ example: 1 })
  revision: number;

  @ApiProperty({ example: 'product-uuid' })
  productId: string;
}

export class UpdateBomDto {
  @ApiPropertyOptional({ example: 'Updated BOM Name' })
  name?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time', example: '2025-08-01T00:00:00.000Z' })
  effectiveFrom?: Date;

  @ApiPropertyOptional({ example: 2 })
  revision?: number;

  @ApiPropertyOptional({ example: 'new-product-uuid' })
  productId?: string;
}
