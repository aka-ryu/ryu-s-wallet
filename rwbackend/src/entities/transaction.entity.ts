import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Transaction')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  tx_id: string;

  @Column({ nullable: true })
  send_type: string;

  @Column({
    type: 'smallint',
    default: 0,
    comment: ' 0 (대기중), 1 (성공), 2(실패)',
  })
  result: number;

  @Column({
    type: 'smallint',
    default: 0,
    comment: ' 0 (아직), 1 (다시보냄)',
  })
  retry: number;

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
