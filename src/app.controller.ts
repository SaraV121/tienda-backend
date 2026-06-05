import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get()
  home(){
    return { 
      mensaje: "API Tienda Online funcionando correctamente",
      documentacion: "https://tienda-backend-0sj2.onrender.com/api",
    }
   }
}
