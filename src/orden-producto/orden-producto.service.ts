import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { OrdenProducto } from './entities/orden-producto.entity';

import { Orden } from '../orden/entities/orden.entity';
import { Producto } from '../producto/entities/producto.entity';

import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@Injectable()
export class OrdenProductoService {
  constructor(
    @InjectRepository(OrdenProducto)
    private ordenProductoRepo: Repository<OrdenProducto>,

    @InjectRepository(Orden)
    private ordenRepo: Repository<Orden>,

    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreateOrdenProductoDto) {
    const orden = await this.ordenRepo.findOne({
      where: {
        idOrden: dto.idOrden,
      },
    });

    if (!orden) {
      throw new NotFoundException(
        'Orden no encontrada',
      );
    }

    const producto = await this.productoRepo.findOne({
      where: {
        idProducto: dto.idProducto,
      },
    });

    if (!producto) {
      throw new NotFoundException(
        'Producto no encontrado',
      );
    }

    const ordenProducto =
      this.ordenProductoRepo.create({
        orden,
        producto,
        cantidad: dto.cantidad,
        precio_unitario: dto.precio_unitario,
      });

    return this.ordenProductoRepo.save(
      ordenProducto,
    );
  }

  findAll() {
    return this.ordenProductoRepo.find({
      relations: ['orden', 'producto'],
    });
  }

  async findOne(id: number) {
    const ordenProducto =
      await this.ordenProductoRepo.findOne({
        where: {
          idOrdenProducto: id,
        },
        relations: ['orden', 'producto'],
      });

    if (!ordenProducto) {
      throw new NotFoundException(
        `OrdenProducto con ID ${id} no encontrado`,
      );
    }

    return ordenProducto;
  }

  async update(
    id: number,
    dto: UpdateOrdenProductoDto,
  ) {
    const ordenProducto = await this.findOne(id);

    Object.assign(ordenProducto, dto);

    return this.ordenProductoRepo.save(
      ordenProducto,
    );
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.ordenProductoRepo.softDelete(id);
  }
}