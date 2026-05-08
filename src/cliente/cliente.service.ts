import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
  ) {}

  create(dto: CreateClienteDto) {
    const cliente = this.clienteRepo.create(dto);

    return this.clienteRepo.save(cliente);
  }

  findAll() {
    return this.clienteRepo.find();
  }

  async findOne(id: number) {
    const cliente = await this.clienteRepo.findOne({
      where: { idCliente: id },
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente con ID ${id} no encontrado`,
      );
    }

    return cliente;
  }

  async update(id: number, dto: UpdateClienteDto) {
    const cliente = await this.findOne(id);

    Object.assign(cliente, dto);

    return this.clienteRepo.save(cliente);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.clienteRepo.softDelete(id);
  }
}