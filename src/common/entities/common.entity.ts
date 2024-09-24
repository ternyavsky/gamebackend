import { IsDate } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @IsDate()
  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  public readonly createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  public updatedAt: Date;
}
