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

import { OrdenProductoService } from './orden-producto.service';

import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@ApiTags('OrdenProducto')
@Controller('orden-producto')
export class OrdenProductoController {
  constructor(
    private readonly ordenProductoService: OrdenProductoService,
  ) {}

  @ApiOperation({
    summary: 'Crear orden-producto',
  })
  @ApiResponse({
    status: 201,
    description: 'OrdenProducto creado correctamente',
  })
  @Post()
  create(@Body() dto: CreateOrdenProductoDto) {
    return this.ordenProductoService.create(dto);
  }

  @ApiOperation({
    summary: 'Listar orden-producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de orden-producto',
  })
  @Get()
  findAll() {
    return this.ordenProductoService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener orden-producto por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'OrdenProducto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'OrdenProducto no encontrado',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenProductoService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar orden-producto',
  })
  @ApiResponse({
    status: 200,
    description: 'OrdenProducto actualizado',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOrdenProductoDto,
  ) {
    return this.ordenProductoService.update(
      +id,
      dto,
    );
  }

  @ApiOperation({
    summary: 'Eliminar orden-producto',
  })
  @ApiResponse({
    status: 200,
    description: 'OrdenProducto eliminado',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenProductoService.remove(+id);
  }
}