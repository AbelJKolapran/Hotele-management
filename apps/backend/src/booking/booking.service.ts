import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, createdById: string) {
    // Generate unique booking ID
    const bookingId = this.generateBookingId();
    
    // Check if room is available
    const room = await this.prisma.room.findUnique({
      where: { id: createBookingDto.roomId },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (room.status !== 'AVAILABLE') {
      throw new BadRequestException('Room is not available');
    }

    // Calculate total amount
    const nights = Math.ceil(
      (new Date(createBookingDto.checkOut).getTime() - new Date(createBookingDto.checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );
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

    // Update room status to OCCUPIED
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

  async findOne(id: string) {
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
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async findByBookingId(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingId },
      include: {
        room: true,
        serviceRequests: true,
        stayRating: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
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

  async remove(id: string) {
    const booking = await this.findOne(id);
    
    // Update room status back to AVAILABLE
    await this.prisma.room.update({
      where: { id: booking.roomId },
      data: { status: 'AVAILABLE' },
    });
    
    return this.prisma.booking.delete({
      where: { id },
    });
  }

  async checkIn(id: string) {
    const booking = await this.findOne(id);
    
    if (booking.status !== 'ACTIVE') {
      throw new BadRequestException('Booking is not active');
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

  async checkOut(id: string) {
    const booking = await this.findOne(id);
    
    if (booking.status !== 'CHECKED_IN') {
      throw new BadRequestException('Guest must be checked in first');
    }

    // Update room status to CLEANING
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

  async completeStay(id: string) {
    const booking = await this.findOne(id);
    
    if (booking.status !== 'CHECKED_OUT') {
      throw new BadRequestException('Guest must be checked out first');
    }

    // Update room status back to AVAILABLE
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

  private generateBookingId(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `HE${timestamp}${random}`.toUpperCase();
  }
}
