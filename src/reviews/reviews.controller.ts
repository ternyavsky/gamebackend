import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from './dto/create-review.dto';

@Controller('api/reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {


    }
    @Post()
    async create(@Body() createReviewDto: CreateReviewDTO) {
        return await this.reviewsService.create(createReviewDto);
    }
    @Get()
    async findAll() {
        return await this.reviewsService.findAll();
    }
}
