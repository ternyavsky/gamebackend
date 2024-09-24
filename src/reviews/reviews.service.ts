import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDTO } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>
    ) { }

    async create(createReviewDto: CreateReviewDTO) {
        const review = this.reviewRepository.create({
            user: { id: createReviewDto.userId },
            payment: { id: createReviewDto.paymentId },
            text: createReviewDto.text,
            isPositive: createReviewDto.isPositive
        })
        return await this.reviewRepository.save(review)
    }

    async findAll() {
        return await this.reviewRepository.find({ relations: { payment: true, user: true } })
    }
}
