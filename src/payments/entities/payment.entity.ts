import { CommonEntity } from 'src/common/entities/common.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'payments' })
export class Payment extends CommonEntity {
    @Column()
    public value: number;

    @Column()
    public payment_id: number;

    @ManyToOne(() => User, (user) => user.payments)
    public user: User;

    @OneToOne(() => Review, (review) => review.payment)
    public review: Review;

    @Column({ default: 'In process' })
    public status: string;

    @Column({ name: 'is_positive', default: true })
    public isPositive: boolean;
}
