import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

export interface AdminLoginDto {
  username: string;
  password: string;
}

export interface UserLoginDto {
  bookingId: string;
  phoneNumber: string;
}

export interface JwtPayload {
  sub: string;
  username?: string;
  role?: string;
  type: 'admin' | 'user';
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUser(bookingId: string, phoneNumber: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingId },
      include: {
        room: true,
      },
    });

    if (booking && booking.phoneNumber === phoneNumber) {
      return booking;
    }
    return null;
  }

  async loginAdmin(adminLoginDto: AdminLoginDto) {
    const user = await this.validateAdmin(adminLoginDto.username, adminLoginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      type: 'admin',
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async loginUser(userLoginDto: UserLoginDto) {
    const booking = await this.validateUser(userLoginDto.bookingId, userLoginDto.phoneNumber);
    if (!booking) {
      throw new UnauthorizedException('Invalid booking ID or phone number');
    }

    const payload: JwtPayload = {
      sub: booking.id,
      type: 'user',
    };

    return {
      access_token: this.jwtService.sign(payload),
      booking: {
        id: booking.id,
        bookingId: booking.bookingId,
        guestName: booking.guestName,
        roomNumber: booking.room.roomNumber,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.status,
      },
    };
  }

  async createAdmin(username: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: role as any,
      },
    });
  }
}
