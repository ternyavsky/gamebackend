import { CommonEntity } from 'src/common/entities/common.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'reviews' })
export class Review extends CommonEntity {
    @Column()
    public text: string;

    @ManyToOne(() => User, (user) => user.reviews)
    public user: User;

    @OneToOne(() => Payment, (payment) => payment.review)
    public payment: Payment;

    @Column({ name: 'is_positive', default: true })
    public isPositive: boolean;
}
