import { Controller, Get } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  @Get()
  home() {
    return {
      mensaje: 'API Tienda Online funcionando correctamente',
      documentacion: '/api',
    };
  }
}
