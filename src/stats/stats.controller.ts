import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('api/stats')
export class StatsController {
    constructor(private readonly statsService: StatsService


    ) { }

    @Get('getStats')
    async getMainStats() {
        return await this.statsService.getMainStats();
    }

}
