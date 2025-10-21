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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let RoomService = class RoomService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoomDto) {
        return this.prisma.room.create({
            data: createRoomDto,
        });
    }
    async findAll() {
        return this.prisma.room.findMany({
            orderBy: { roomNumber: 'asc' },
        });
    }
    async findOne(id) {
        const room = await this.prisma.room.findUnique({
            where: { id },
        });
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        return room;
    }
    async update(id, updateRoomDto) {
        const room = await this.findOne(id);
        return this.prisma.room.update({
            where: { id },
            data: updateRoomDto,
        });
    }
    async remove(id) {
        const room = await this.findOne(id);
        return this.prisma.room.delete({
            where: { id },
        });
    }
    async getRoomStats() {
        const totalRooms = await this.prisma.room.count();
        const availableRooms = await this.prisma.room.count({
            where: { status: 'AVAILABLE' },
        });
        const occupiedRooms = await this.prisma.room.count({
            where: { status: 'OCCUPIED' },
        });
        const cleaningRooms = await this.prisma.room.count({
            where: { status: 'CLEANING' },
        });
        return {
            totalRooms,
            availableRooms,
            occupiedRooms,
            cleaningRooms,
        };
    }
    async getAvailableRooms(checkIn, checkOut) {
        const bookedRooms = await this.prisma.booking.findMany({
            where: {
                status: {
                    in: ['ACTIVE', 'CHECKED_IN'],
                },
                OR: [
                    {
                        AND: [
                            { checkIn: { lte: checkIn } },
                            { checkOut: { gt: checkIn } },
                        ],
                    },
                    {
                        AND: [
                            { checkIn: { lt: checkOut } },
                            { checkOut: { gte: checkOut } },
                        ],
                    },
                    {
                        AND: [
                            { checkIn: { gte: checkIn } },
                            { checkOut: { lte: checkOut } },
                        ],
                    },
                ],
            },
            select: { roomId: true },
        });
        const bookedRoomIds = bookedRooms.map(booking => booking.roomId);
        return this.prisma.room.findMany({
            where: {
                status: 'AVAILABLE',
                id: {
                    notIn: bookedRoomIds,
                },
            },
            orderBy: { roomNumber: 'asc' },
        });
    }
};
exports.RoomService = RoomService;
exports.RoomService = RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomService);
//# sourceMappingURL=room.service.js.map