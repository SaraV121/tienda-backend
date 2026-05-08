import { Test, TestingModule } from '@nestjs/testing';
import { OrdenController } from './orden.controller';
import { beforeEach, describe, it } from 'node:test';

describe('OrdenController', () => {
  let controller: OrdenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenController],
    }).compile();

    controller = module.get<OrdenController>(OrdenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
function expect(controller: OrdenController) {
  throw new Error('Function not implemented.');
}

