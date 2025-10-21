"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let RatingService = class RatingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStayRatingDto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: createStayRatingDto.bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        if (booking.status !== 'COMPLETED') {
            throw new common_1.BadRequestException('Can only rate completed stays');
        }
        const existingRating = await this.prisma.stayRating.findUnique({
            where: { bookingId: createStayRatingDto.bookingId },
        });
        if (existingRating) {
            throw new common_1.BadRequestException('Rating already exists for this booking');
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
    async findByBooking(bookingId) {
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
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RatingService);
//# sourceMappingURL=rating.service.js.map