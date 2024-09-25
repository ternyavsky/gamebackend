import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Payment } from 'src/tinkoff/dto/payment.dto';

@Controller('api/payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {



    }

    @Post('payment')
    async makePayment(@Body() paymentDto: Payment) {
        return await this.paymentsService.makePayment(paymentDto.Amount)
    }

}
