import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../common/prisma/prisma.service';
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
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateAdmin(username: string, password: string): Promise<{
        id: string;
        username: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    validateUser(bookingId: string, phoneNumber: string): Promise<{
        room: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roomNumber: string;
            roomType: import(".prisma/client").$Enums.RoomType;
            status: import(".prisma/client").$Enums.RoomStatus;
            price: number;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.BookingStatus;
        bookingId: string;
        guestName: string;
        guestEmail: string | null;
        phoneNumber: string;
        checkIn: Date;
        checkOut: Date;
        paymentStatus: import(".prisma/client").$Enums.PaymentStatus;
        totalAmount: number;
        specialRequests: string | null;
        checkedInAt: Date | null;
        checkedOutAt: Date | null;
        roomId: string;
        createdById: string;
    }>;
    loginAdmin(adminLoginDto: AdminLoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            username: string;
            role: import(".prisma/client").$Enums.UserRole;
        };
    }>;
    loginUser(userLoginDto: UserLoginDto): Promise<{
        access_token: string;
        booking: {
            id: string;
            bookingId: string;
            guestName: string;
            roomNumber: string;
            checkIn: Date;
            checkOut: Date;
            status: import(".prisma/client").$Enums.BookingStatus;
        };
    }>;
    createAdmin(username: string, password: string, role: string): Promise<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
