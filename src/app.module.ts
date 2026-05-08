import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { OrdenModule } from './orden/orden.module';
import { OrdenProductoModule } from './orden-producto/orden-producto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Zanahorias21',
      database: 'tienda_db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ClienteModule,
    CategoriaModule,
    ProductoModule,
    OrdenModule,
    OrdenProductoModule,
  ],
})
export class AppModule {}