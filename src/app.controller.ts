import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  @Get()
  home() {
    return {
      mensaje: 'API Tienda Online funcionando correctamente',
      documentacion: '/api',
    };
  }
}
