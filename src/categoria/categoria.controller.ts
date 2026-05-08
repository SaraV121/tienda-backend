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

import { CategoriaService } from './categoria.service';

import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriaController {
  constructor(
    private readonly categoriaService: CategoriaService,
  ) {}

  @ApiOperation({
    summary: 'Crear categoria',
  })
  @ApiResponse({
    status: 201,
    description: 'Categoria creada correctamente',
  })
  @Post()
  create(@Body() dto: CreateCategoriaDto) {
    return this.categoriaService.create(dto);
  }

  @ApiOperation({
    summary: 'Listar categorias',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorias',
  })
  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @ApiOperation({
    summary: 'Obtener categoria por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Categoria no encontrada',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @ApiOperation({
    summary: 'Actualizar categoria',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria actualizada',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoriaDto,
  ) {
    return this.categoriaService.update(+id, dto);
  }

  @ApiOperation({
    summary: 'Eliminar categoria',
  })
  @ApiResponse({
    status: 200,
    description: 'Categoria eliminada',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}