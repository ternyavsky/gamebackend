import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Payment } from 'src/payments/entities/payment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Payment])],
  controllers: [StatsController],
    providers: [StatsService],
})
export class StatsModule { }
