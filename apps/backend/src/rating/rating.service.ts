import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateStayRatingDto } from './dto/rating.dto';

@Injectable()
export class RatingService {
  constructor(private prisma: PrismaService) {}

  async create(createStayRatingDto: CreateStayRatingDto) {
    // Check if booking exists and is completed
    const booking = await this.prisma.booking.findUnique({
      where: { id: createStayRatingDto.bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== 'COMPLETED') {
      throw new BadRequestException('Can only rate completed stays');
    }

    // Check if rating already exists
    const existingRating = await this.prisma.stayRating.findUnique({
      where: { bookingId: createStayRatingDto.bookingId },
    });

    if (existingRating) {
      throw new BadRequestException('Rating already exists for this booking');
    }

    return this.prisma.stayRating.create({
      data: createStayRatingDto,
      include: {
        booking: {
          include: {
            room: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.stayRating.findMany({
      include: {
        booking: {
          include: {
            room: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByBooking(bookingId: string) {
    return this.prisma.stayRating.findUnique({
      where: { bookingId },
      include: {
        booking: {
          include: {
            room: true,
          },
        },
      },
    });
  }

  async getRatingStats() {
    const totalRatings = await this.prisma.stayRating.count();
    const averageRating = await this.prisma.stayRating.aggregate({
      _avg: {
        rating: true,
      },
    });

    const ratingDistribution = await this.prisma.stayRating.groupBy({
      by: ['rating'],
      _count: {
        rating: true,
      },
    });

    return {
      totalRatings,
      averageRating: averageRating._avg.rating || 0,
      ratingDistribution: ratingDistribution.map(item => ({
        rating: item.rating,
        count: item._count.rating,
      })),
    };
  }
}
