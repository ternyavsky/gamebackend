import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import {
    BullConfig,
    chunkingOptions,
    pusherOptions,
    S3Config,
    TelegramConfig,
    TypeOrmConfig,
} from './config';
import { TelegramModule } from 'nestjs-telegram';
import { S3Module } from 'nestjs-s3';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { CommonModule } from './common/common.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CouponsModule } from './coupons/coupons.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { TinkoffModule } from './tinkoff/tinkoff.module';
import { PusherModule } from 'nestjs-pusher';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        BullModule.forRootAsync({
            useClass: BullConfig,
        }),
        PusherModule.forRoot(
            {
                secret: process.env.PUSHER_SECRET,
                appId: process.env.PUSHER_APP_ID,
                key: process.env.PUSHER_KEY,
                cluster: process.env.PUSHER_CLUSTER,
            },
            chunkingOptions,
            true,
        ),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfig,
            async dataSourceFactory(options) {
                if (!options) {
                    throw new Error('Invalid options passed');
                }
                return addTransactionalDataSource(new DataSource(options));
            },
        }),
        S3Module.forRootAsync({
            useClass: S3Config,
        }),
        TelegramModule.forRootAsync({
            useClass: TelegramConfig,
            inject: [ConfigService],
        }),
        UsersModule,
        CommonModule,
        ReviewsModule,
        CouponsModule,
        ReceiptsModule,
        TinkoffModule,
        AuthModule,
        PaymentsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
