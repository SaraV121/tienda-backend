import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Categoria } from './entities/categoria.entity';

import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepo: Repository<Categoria>,
  ) {}

  create(dto: CreateCategoriaDto) {
    const categoria = this.categoriaRepo.create(dto);

    return this.categoriaRepo.save(categoria);
  }

  findAll() {
    return this.categoriaRepo.find({
      relations: ['productos'],
    });
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepo.findOne({
      where: { idCategoria: id },
      relations: ['productos'],
    });

    if (!categoria) {
      throw new NotFoundException(
        `Categoria con ID ${id} no encontrada`,
      );
    }

    return categoria;
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    const categoria = await this.findOne(id);

    Object.assign(categoria, dto);

    return this.categoriaRepo.save(categoria);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.categoriaRepo.softDelete(id);
  }
}