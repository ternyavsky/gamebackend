import { Injectable } from '@nestjs/common';
import { Payment } from './dto/payment.dto';
import bcrypt from 'src/config/bcrypt';
import axios from 'axios';
import { Item } from './dto/item.dto';

@Injectable()
export class TinkoffService {
    constructor() { }
    testUrl = process.env.TINKOFF_TEST_URL;
    prodUrl = process.env.TINKOFF_API_URL;

    async generateUrl(payment: Payment) { }

    async generateTestUrl(payment: Payment) {
        this.setSuccessUrl(payment);
        this.setFailUrL(payment);
        this.setEnvParams(payment);

        payment['DATA'] = {
            Phone: '+79086007430',
            Email: 'reci@mail.com',
        };
        payment['NotificationURL'] = "http://localhost:8000/api/tinkoff/callback"
        const res = await axios.post(`${this.prodUrl}/v2/Init`, payment);
        return res.data;
    }

    async setSuccessUrl(payment: Payment) {
        payment['SuccessURL'] = 'http/';
    }

    async setEnvParams(payment: Payment) {
        payment['TerminalKey'] = process.env.TINKOFF_TERMINAL;
        payment['Token'] = process.env.TINKOFF_SECRET_KEY;
    }

    async setFailUrL(payment: Payment) {
        payment['FailURL'] = 'some/';
    }
}
