import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BrokersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // Generate slug from name if not provided
    if (!data.slug && data.name) {
      data.slug = data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
    return this.prisma.broker.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.broker.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.broker.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.broker.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.broker.delete({
      where: { id },
    });
  }
}
