import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({
      data: createRoomDto,
    });
  }

  async findAll() {
    return this.prisma.room.findMany({
      orderBy: { roomNumber: 'asc' },
    });
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return room;
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);
    
    return this.prisma.room.update({
      where: { id },
      data: updateRoomDto,
    });
  }

  async remove(id: string) {
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

  async getAvailableRooms(checkIn: Date, checkOut: Date) {
    // Find rooms that are available and not booked during the requested period
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
}
