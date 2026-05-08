import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente!: number;

  @Column()
  nombres!: string;

  @Column()
  paterno!: string;

  @Column()
  materno!: string;

  @Column({ unique: true })
  email!: string;

  @CreateDateColumn()
  creadoEn!: Date;

  @UpdateDateColumn()
  actualizadoEn!: Date;

  @DeleteDateColumn()
  eliminadoEn!: Date;
}