import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserWallet } from './wallet.entity';

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
    comment: ' 0 (지갑 없음), 1 (지갑 있음)',
  })
  is_wallet: number;

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

  @OneToOne(() => UserWallet, (UserWallet) => UserWallet.user)
  @JoinColumn()
  wallet: UserWallet;
}
