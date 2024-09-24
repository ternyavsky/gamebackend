import { Module } from '@nestjs/common';
import { TinkoffService } from './tinkoff.service';
import { TinkoffController } from './tinkoff.controller';

@Module({
  controllers: [TinkoffController],
  providers: [TinkoffService],
})
export class TinkoffModule {}
