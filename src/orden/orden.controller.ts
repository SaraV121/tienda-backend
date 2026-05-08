import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { OrdenService } from './orden.service';

import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@ApiTags('Ordenes')
@Controller('ordenes')
export class OrdenController {
  constructor(
    private readonly ordenService: OrdenService,
  ) {}

  @ApiOperation({
    summary: 'Crear orden',
  })
  @ApiResponse({
    status: 201,
    description: 'Orden creada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente no encontrado',
  })
  @Post()
  create(@Body() dto: CreateOrdenDto) {
    return this.ordenService.create(dto);
  }

  @ApiOperation({
    summary: 'Listar órdenes',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de órdenes',
  })
  @Get()
  findAll() {
    return this.ordenService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener orden por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Orden no encontrada',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar orden',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden actualizada',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOrdenDto,
  ) {
    return this.ordenService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Eliminar orden',
  })
  @ApiResponse({
    status: 200,
    description: 'Orden eliminada',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenService.remove(+id);
  }
}