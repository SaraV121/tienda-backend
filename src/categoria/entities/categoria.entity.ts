import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { Producto } from '../../producto/entities/producto.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
    idCategoria!: number;

  @Column()
    nombre!: string;

  @Column()
    descripcion!: string;

  @CreateDateColumn()
    creadoEn!: Date;

  @UpdateDateColumn()
    actualizadoEn!: Date;

  @DeleteDateColumn()
    eliminadoEn!: Date;

  @OneToMany(() => Producto, producto => producto.categoria)
    productos!: Producto[];
}