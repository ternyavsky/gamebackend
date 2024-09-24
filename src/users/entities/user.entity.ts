import { CommonEntity } from 'src/common/entities/common.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User extends CommonEntity {
    @Column({ nullable: true })
    public name: string;

    @Column({ nullable: true, name: 'lastname' })
    public lastName: string;

    @Column({ nullable: true })
    public avatar: string;

    @Column({ nullable: true })
    public vkLink: string;

    @Column({ nullable: true })
    public tgLink: string;

    @Column({ default: false })
    public online: boolean

    @Column({ nullable: true })
    public email: string;

    @OneToMany(() => Review, (review) => review.user)
    public reviews: Review[];

    @OneToMany(() => Payment, (payment) => payment.user)
    public payments: Payment[];

    @Column()
    public password: string;
}
