import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'smallint',
    comment: ' 0 (일반 이메일 회원), 1 (소셜회원)',
  })
  is_social: number;

  @Column({ nullable: true, comment: '소셜 가입시 소셜에서 발급해주는 pk' })
  social_pk: string;

  @Column({
    type: 'smallint',
    default: 0,
    comment: ' 0 (정상), 1 (탈퇴)',
  })
  is_deleted: number;

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
