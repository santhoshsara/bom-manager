import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UnitService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UnitCreateInput) {
    return this.prisma.unit.create({ data });
  }

  findAll() {
    return this.prisma.unit.findMany();
  }

  findOne(id: string) {
    return this.prisma.unit.findUnique({ where: { id } });
  }

  update(id: string, data: Prisma.UnitUpdateInput) {
    return this.prisma.unit.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.unit.delete({ where: { id } });
  }
}
