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

import { ProductoService } from './producto.service';

import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@ApiTags('Productos')
@Controller('productos')
export class ProductoController {
  constructor(
    private readonly productoService: ProductoService,
  ) {}

  @ApiOperation({
    summary: 'Crear producto',
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria no encontrada',
  })
  @Post()
  create(@Body() dto: CreateProductoDto) {
    return this.productoService.create(dto);
  }

  @ApiOperation({
    summary: 'Listar productos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos',
  })
  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener producto por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductoDto,
  ) {
    return this.productoService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Eliminar producto',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}