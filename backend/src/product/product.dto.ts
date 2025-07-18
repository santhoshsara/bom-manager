import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Status } from '@prisma/client';

export class CreateProductDto {
  @ApiProperty({ example: 'Product A' })
  name: string;

  @ApiProperty({ example: 'PROD-001' })
  code: string;

  @ApiPropertyOptional({ example: 'Optional product description' })
  description?: string;

  @ApiPropertyOptional({ enum: Status, default: Status.Active })
  status?: Status;
}

export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Updated Product' })
  name?: string;

  @ApiPropertyOptional({ example: 'PROD-999' })
  code?: string;

  @ApiPropertyOptional({ example: 'Updated description' })
  description?: string;

  @ApiPropertyOptional({ enum: Status, example: Status.Inactive })
  status?: Status;
}
