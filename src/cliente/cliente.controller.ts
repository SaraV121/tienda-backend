import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { ClienteService } from './cliente.service';

import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
  ) {}

  @ApiOperation({
    summary: 'Crear cliente',
  })
  @ApiResponse({
    status: 201,
    description: 'Cliente creado correctamente',
  })
  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clienteService.create(dto);
  }

  @ApiOperation({
    summary: 'Listar clientes',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de clientes',
  })
  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener cliente por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateClienteDto,
  ) {
    return this.clienteService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Eliminar cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Cliente eliminado',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}