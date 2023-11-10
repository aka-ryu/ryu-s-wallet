import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

@Entity('Attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column('date')
  date: Date;

  @Column({
    type: 'smallint',
    default: 0,
    comment: ' 0 (미지급), 1 (지급완료)',
  })
  is_delecomcompensationpensationted: number;
}
