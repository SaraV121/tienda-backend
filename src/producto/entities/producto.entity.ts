import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Categoria } from '../../categoria/entities/categoria.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
    idProducto!: number;

  @Column()
    nombre!: string;

  @Column()
    descripcion!: string;

  @Column('decimal')
    precio!: number;

  @Column()
    stock!: number;

  @ManyToOne(() => Categoria, categoria => categoria.productos)
    @JoinColumn({ name: 'idCategoria' })
    categoria!: Categoria;

  @OneToMany(() => OrdenProducto, op => op.producto)
    ordenProductos!: OrdenProducto[];

  @CreateDateColumn()
    creadoEn!: Date;

  @UpdateDateColumn()
    actualizadoEn!: Date;

  @DeleteDateColumn()
    eliminadoEn!: Date;
}