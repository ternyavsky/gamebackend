import { Body, Controller, Post } from '@nestjs/common';
import { TinkoffService } from './tinkoff.service';
import { Payment } from './dto/payment.dto';

@Controller('tinkoff')
export class TinkoffController {
	constructor(private readonly tinkoffService: TinkoffService) {}
	@Post()
	async paymentInit(@Body() payment: Payment) {
		return await this.tinkoffService.generateTestUrl(payment);
	}
}
