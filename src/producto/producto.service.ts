import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Producto } from './entities/producto.entity';
import { Categoria } from '../categoria/entities/categoria.entity';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  async create(dto: CreateProductoDto) {
    const categoria = await this.categoriaRepo.findOne({
      where: {
        idCategoria: dto.idCategoria,
      },
    });

    if (!categoria) {
      throw new NotFoundException(
        'Categoria no encontrada',
      );
    }

    const producto = this.productoRepo.create({
      nombre: dto.nombre,
      descripcion: dto.descripcion,
      precio: dto.precio,
      stock: dto.stock,
      categoria,
    });

    return this.productoRepo.save(producto);
  }

  findAll() {
    return this.productoRepo.find({
      relations: ['categoria'],
    });
  }

  async findOne(id: number) {
    const producto = await this.productoRepo.findOne({
      where: { idProducto: id },
      relations: ['categoria'],
    });

    if (!producto) {
      throw new NotFoundException(
        `Producto con ID ${id} no encontrado`,
      );
    }

    return producto;
  }

  async update(id: number, dto: UpdateProductoDto) {
    const producto = await this.findOne(id);

    if (dto.idCategoria) {
      const categoria = await this.categoriaRepo.findOne({
        where: {
          idCategoria: dto.idCategoria,
        },
      });

      if (!categoria) {
        throw new NotFoundException(
          'Categoria no encontrada',
        );
      }

      producto.categoria = categoria;
    }

    Object.assign(producto, dto);

    return this.productoRepo.save(producto);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.productoRepo.softDelete(id);
  }
}