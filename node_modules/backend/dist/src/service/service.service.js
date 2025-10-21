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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let ServiceService = class ServiceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createServiceRequestDto, bookingId) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return this.prisma.roomServiceRequest.create({
            data: {
                ...createServiceRequestDto,
                bookingId,
            },
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
        return this.prisma.roomServiceRequest.findMany({
            include: {
                booking: {
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
                },
            },
            orderBy: { requestedAt: 'desc' },
        });
    }
    async findByBooking(bookingId) {
        return this.prisma.roomServiceRequest.findMany({
            where: { bookingId },
            include: {
                booking: {
                    include: {
                        room: true,
                    },
                },
            },
            orderBy: { requestedAt: 'desc' },
        });
    }
    async findOne(id) {
        const serviceRequest = await this.prisma.roomServiceRequest.findUnique({
            where: { id },
            include: {
                booking: {
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
                },
            },
        });
        if (!serviceRequest) {
            throw new common_1.NotFoundException('Service request not found');
        }
        return serviceRequest;
    }
    async update(id, updateServiceRequestDto) {
        const serviceRequest = await this.findOne(id);
        return this.prisma.roomServiceRequest.update({
            where: { id },
            data: {
                ...updateServiceRequestDto,
                completedAt: updateServiceRequestDto.status === 'COMPLETED' ? new Date() : null,
            },
            include: {
                booking: {
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
                },
            },
        });
    }
    async remove(id) {
        const serviceRequest = await this.findOne(id);
        return this.prisma.roomServiceRequest.delete({
            where: { id },
        });
    }
    async getServiceStats() {
        const totalRequests = await this.prisma.roomServiceRequest.count();
        const pendingRequests = await this.prisma.roomServiceRequest.count({
            where: { status: 'PENDING' },
        });
        const completedRequests = await this.prisma.roomServiceRequest.count({
            where: { status: 'COMPLETED' },
        });
        return {
            totalRequests,
            pendingRequests,
            completedRequests,
        };
    }
    async getRequestsByType() {
        const requestsByType = await this.prisma.roomServiceRequest.groupBy({
            by: ['requestType'],
            _count: {
                requestType: true,
            },
        });
        return requestsByType.map(item => ({
            type: item.requestType,
            count: item._count.requestType,
        }));
    }
};
exports.ServiceService = ServiceService;
exports.ServiceService = ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ServiceService);
//# sourceMappingURL=service.service.js.map