import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBomDto } from './bom.dto';

@Injectable()
export class BomService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBomDto) {
    return this.prisma.bOM.create({
      data: {
        name: dto.name,
        effectiveFrom: dto.effectiveFrom,
        revision: dto.revision,
        product: {
          connect: { id: dto.productId },
        },
      },
    });
  }

  findAll() {
    return this.prisma.bOM.findMany({
      include: {
        product: { select: { id: true, name: true } },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.bOM.findUnique({
      where: { id },
      include: {
        product: { select: { id: true, name: true } },
      },
    });
  }

  update(id: string, data: Prisma.BOMUpdateInput) {
    return this.prisma.bOM.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.bOM.delete({ where: { id } });
  }
}
