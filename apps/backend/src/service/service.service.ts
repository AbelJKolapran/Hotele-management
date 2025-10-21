import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateServiceRequestDto, UpdateServiceRequestDto } from './dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}

  async create(createServiceRequestDto: CreateServiceRequestDto, bookingId: string) {
    // Verify booking exists and belongs to user
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
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

  async findByBooking(bookingId: string) {
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

  async findOne(id: string) {
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
      throw new NotFoundException('Service request not found');
    }

    return serviceRequest;
  }

  async update(id: string, updateServiceRequestDto: UpdateServiceRequestDto) {
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

  async remove(id: string) {
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
}
