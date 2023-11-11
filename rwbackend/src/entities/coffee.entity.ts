import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Coffee')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({
    type: 'smallint',
    default: 0,
    comment: ' 0 (미사용), 1 (사용완료)',
  })
  is_used: number;

  @Column()
  code: string;
}
