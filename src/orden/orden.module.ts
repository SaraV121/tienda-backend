import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdenController } from './orden.controller';
import { OrdenService } from './orden.service';

import { Orden } from './entities/orden.entity';
import { Cliente } from '../cliente/entities/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Orden,
      Cliente,
    ]),
  ],
  controllers: [OrdenController],
  providers: [OrdenService],
})
export class OrdenModule {}