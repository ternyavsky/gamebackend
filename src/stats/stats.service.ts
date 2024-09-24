import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/payments/entities/payment.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { MainStatsDTO } from './dto/mainStats.dto';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentsRepository: Repository<Payment>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) { }
    async getMainStats(): Promise<MainStatsDTO> {
        const users = await this.usersRepository.count()
        const online = await this.usersRepository.count({ where: { online: true } })
        const replinish = await this.paymentsRepository.count()
        return { users, online, replinish }
    }
}
