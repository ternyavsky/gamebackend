import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TinkoffService } from 'src/tinkoff/tinkoff.service';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
    constructor(
        private readonly tinkoffService: TinkoffService,
        @InjectRepository(Payment)
        private readonly paymentsRepository: Repository<Payment>
    ) { }

    async makePayment(amount: number) {
        const link = await this.tinkoffService.generateTestUrl({ Amount: amount })
        return link
    }


}
