import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdenProductoController } from './orden-producto.controller';
import { OrdenProductoService } from './orden-producto.service';

import { OrdenProducto } from './entities/orden-producto.entity';
import { Orden } from '../orden/entities/orden.entity';
import { Producto } from '../producto/entities/producto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdenProducto,
      Orden,
      Producto,
    ]),
  ],
  controllers: [OrdenProductoController],
  providers: [OrdenProductoService],
})
export class OrdenProductoModule {}