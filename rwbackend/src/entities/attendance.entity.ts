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
}
