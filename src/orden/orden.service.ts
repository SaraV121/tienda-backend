import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Orden } from './entities/orden.entity';
import { Cliente } from '../cliente/entities/cliente.entity';

import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden)
    private ordenRepo: Repository<Orden>,

    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  async create(dto: CreateOrdenDto) {
    const cliente = await this.clienteRepo.findOne({
      where: {
        idCliente: dto.idCliente,
      },
    });

    if (!cliente) {
      throw new NotFoundException(
        'Cliente no encontrado',
      );
    }

    const orden = this.ordenRepo.create({
      estado: dto.estado,
      total: dto.total,
      cliente,
    });

    return this.ordenRepo.save(orden);
  }

  findAll() {
    return this.ordenRepo.find({
      relations: [
        'cliente',
        'detalles',
        'detalles.producto',
      ],
    });
  }

  async findOne(id: number) {
    const orden = await this.ordenRepo.findOne({
      where: { idOrden: id },
      relations: [
        'cliente',
        'detalles',
        'detalles.producto',
      ],
    });

    if (!orden) {
      throw new NotFoundException(
        `Orden con ID ${id} no encontrada`,
      );
    }

    return orden;
  }

  async update(id: number, dto: UpdateOrdenDto) {
    const orden = await this.findOne(id);

    Object.assign(orden, dto);

    return this.ordenRepo.save(orden);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.ordenRepo.softDelete(id);
  }
}