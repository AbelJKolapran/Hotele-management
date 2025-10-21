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
exports.BookingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let BookingService = class BookingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBookingDto, createdById) {
        const bookingId = this.generateBookingId();
        const room = await this.prisma.room.findUnique({
            where: { id: createBookingDto.roomId },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        if (room.status !== 'AVAILABLE') {
            throw new common_1.BadRequestException('Room is not available');
        }
        const nights = Math.ceil((new Date(createBookingDto.checkOut).getTime() - new Date(createBookingDto.checkIn).getTime()) / (1000 * 60 * 60 * 24));
        const totalAmount = nights * Number(room.price);
        const booking = await this.prisma.booking.create({
            data: {
                ...createBookingDto,
                bookingId,
                totalAmount,
                createdById,
            },
            include: {
                room: true,
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    },
                },
            },
        });
        await this.prisma.room.update({
            where: { id: createBookingDto.roomId },
            data: { status: 'OCCUPIED' },
        });
        return booking;
    }
    async findAll() {
        return this.prisma.booking.findMany({
            include: {
                room: true,
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    },
                },
                serviceRequests: true,
                stayRating: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                room: true,
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    },
                },
                serviceRequests: true,
                stayRating: true,
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return booking;
    }
    async findByBookingId(bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { bookingId },
            include: {
                room: true,
                serviceRequests: true,
                stayRating: true,
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return booking;
    }
    async update(id, updateBookingDto) {
        const booking = await this.findOne(id);
        return this.prisma.booking.update({
            where: { id },
            data: updateBookingDto,
            include: {
                room: true,
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    },
                },
                serviceRequests: true,
                stayRating: true,
            },
        });
    }
    async remove(id) {
        const booking = await this.findOne(id);
        await this.prisma.room.update({
            where: { id: booking.roomId },
            data: { status: 'AVAILABLE' },
        });
        return this.prisma.booking.delete({
            where: { id },
        });
    }
    async checkIn(id) {
        const booking = await this.findOne(id);
        if (booking.status !== 'ACTIVE') {
            throw new common_1.BadRequestException('Booking is not active');
        }
        return this.prisma.booking.update({
            where: { id },
            data: {
                status: 'CHECKED_IN',
                checkedInAt: new Date(),
            },
            include: {
                room: true,
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    },
                },
            },
        });
    }
    async checkOut(id) {
        const booking = await this.findOne(id);
        if (booking.status !== 'CHECKED_IN') {
            throw new common_1.BadRequestException('Guest must be checked in first');
        }
        await this.prisma.room.update({
            where: { id: booking.roomId },
            data: { status: 'CLEANING' },
        });
        return this.prisma.booking.update({
            where: { id },
            data: {
                status: 'CHECKED_OUT',
                checkedOutAt: new Date(),
            },
            include: {
                room: true,
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    },
                },
            },
        });
    }
    async completeStay(id) {
        const booking = await this.findOne(id);
        if (booking.status !== 'CHECKED_OUT') {
            throw new common_1.BadRequestException('Guest must be checked out first');
        }
        await this.prisma.room.update({
            where: { id: booking.roomId },
            data: { status: 'AVAILABLE' },
        });
        return this.prisma.booking.update({
            where: { id },
            data: {
                status: 'COMPLETED',
            },
            include: {
                room: true,
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        role: true,
                    },
                },
            },
        });
    }
    async getBookingStats() {
        const totalBookings = await this.prisma.booking.count();
        const activeBookings = await this.prisma.booking.count({
            where: { status: 'ACTIVE' },
        });
        const checkedInBookings = await this.prisma.booking.count({
            where: { status: 'CHECKED_IN' },
        });
        const completedBookings = await this.prisma.booking.count({
            where: { status: 'COMPLETED' },
        });
        return {
            totalBookings,
            activeBookings,
            checkedInBookings,
            completedBookings,
        };
    }
    generateBookingId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `HE${timestamp}${random}`.toUpperCase();
    }
};
exports.BookingService = BookingService;
exports.BookingService = BookingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingService);
//# sourceMappingURL=booking.service.js.map