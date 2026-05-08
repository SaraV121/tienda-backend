import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Orden } from '../../orden/entities/orden.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('orden_producto')
export class OrdenProducto {
  @PrimaryGeneratedColumn()
  idOrdenProducto: number | undefined;

  @ManyToOne(() => Orden, orden => orden.detalles)
    @JoinColumn({ name: 'idOrden' })
    orden: Orden = new Orden;

  @ManyToOne(() => Producto, producto => producto.ordenProductos)
    @JoinColumn({ name: 'idProducto' })
    producto: Producto = new Producto;

  @Column()
    cantidad!: number;

  @Column('decimal')
    precio_unitario!: number;

  @CreateDateColumn()
    creadoEn!: Date;

  @UpdateDateColumn()
    actualizadoEn!: Date;

  @DeleteDateColumn()
    eliminadoEn!: Date;
}