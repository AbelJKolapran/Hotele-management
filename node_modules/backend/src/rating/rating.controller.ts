import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { CreateStayRatingDto } from './dto/rating.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard, UserGuard } from '../auth/jwt-auth.guard';

@Controller('stay-ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @UseGuards(JwtAuthGuard, UserGuard)
  @Post()
  create(@Body() createStayRatingDto: CreateStayRatingDto) {
    return this.ratingService.create(createStayRatingDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.ratingService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.ratingService.getRatingStats();
  }

  @Get(':bookingId')
  findByBooking(@Param('bookingId') bookingId: string) {
    return this.ratingService.findByBooking(bookingId);
  }
}
