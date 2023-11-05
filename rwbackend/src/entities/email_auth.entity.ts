import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('EmailCheck')
export class EmailVerify {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column({
    type: 'smallint',
    default: 0,
    comment: ' 0 (미사용), 1 (사용완료)',
  })
  is_used: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
