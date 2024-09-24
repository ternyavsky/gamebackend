import { CommonEntity } from 'src/common/entities/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'coupons' })
export class Coupon extends CommonEntity {
  @Column()
  public code: number;

  @Column()
  public title: string;

  @ManyToOne(() => User, (user) => user.reviews)
  public user: User;

  @Column({ name: 'is_positive', default: true })
  public isPositive: boolean;

  @Column({ default: 0 })
  public total: number;

  @Column({ name: 'date_start', type: 'timestamptz' }) // Recommended
  public dateStart: Date;

  @Column({ name: 'date_end', type: 'timestamptz' }) // Recommended
  public dateEnd: Date;
}
