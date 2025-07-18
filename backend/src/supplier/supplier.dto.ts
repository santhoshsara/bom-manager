import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSupplierDto {
  @ApiProperty({ example: 'ABC Suppliers' })
  name: string;

  @ApiProperty({ example: 'SUP-001' })
  code: string;

  @ApiPropertyOptional({ example: '123 Industrial Area' })
  address?: string;
}

export class UpdateSupplierDto {
  @ApiPropertyOptional({ example: 'XYZ Suppliers' })
  name?: string;

  @ApiPropertyOptional({ example: 'SUP-002' })
  code?: string;

  @ApiPropertyOptional({ example: 'Updated address' })
  address?: string;
}
