import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { Cliente } from '../../cliente/entities/cliente.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn()
    idOrden!: number;

  @Column()
    estado!: string;

  @Column('decimal')
    total!: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'idCliente' })
  cliente: Cliente = new Cliente;

  @OneToMany(() => OrdenProducto, op => op.orden)
    detalles!: OrdenProducto[];

  @CreateDateColumn()
    creadoEn!: Date;

  @UpdateDateColumn()
    actualizadoEn!: Date;

  @DeleteDateColumn()
    eliminadoEn!: Date;
}