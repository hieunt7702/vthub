import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BrokersModule } from './brokers/brokers.module';

@Module({
  imports: [PrismaModule, BrokersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
