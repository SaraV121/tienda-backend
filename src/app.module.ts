import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

import { ClienteModule } from './cliente/cliente.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProductoModule } from './producto/producto.module';
import { OrdenModule } from './orden/orden.module';
import { OrdenProductoModule } from './orden-producto/orden-producto.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.DB_HOST,

      port: parseInt(
        process.env.DB_PORT || '5432',
      ),

      username:
        process.env.DB_USERNAME,

      password:
        process.env.DB_PASSWORD,

      database:
        process.env.DB_NAME,

      autoLoadEntities: true,

      synchronize: true,
    }),

    ClienteModule,
    CategoriaModule,
    ProductoModule,
    OrdenModule,
    OrdenProductoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}