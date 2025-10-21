import { PrismaService } from '../common/prisma/prisma.service';
import { CreateServiceRequestDto, UpdateServiceRequestDto } from './dto/service.dto';
export declare class ServiceService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createServiceRequestDto: CreateServiceRequestDto, bookingId: string): Promise<{
        booking: {
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
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ServiceRequestStatus;
        description: string | null;
        bookingId: string;
        requestType: import(".prisma/client").$Enums.ServiceRequestType;
        notes: string | null;
        requestedAt: Date;
        completedAt: Date | null;
    }>;
    findAll(): Promise<({
        booking: {
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
            createdBy: {
                id: string;
                username: string;
                role: import(".prisma/client").$Enums.UserRole;
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
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ServiceRequestStatus;
        description: string | null;
        bookingId: string;
        requestType: import(".prisma/client").$Enums.ServiceRequestType;
        notes: string | null;
        requestedAt: Date;
        completedAt: Date | null;
    })[]>;
    findByBooking(bookingId: string): Promise<({
        booking: {
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
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ServiceRequestStatus;
        description: string | null;
        bookingId: string;
        requestType: import(".prisma/client").$Enums.ServiceRequestType;
        notes: string | null;
        requestedAt: Date;
        completedAt: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        booking: {
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
            createdBy: {
                id: string;
                username: string;
                role: import(".prisma/client").$Enums.UserRole;
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
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ServiceRequestStatus;
        description: string | null;
        bookingId: string;
        requestType: import(".prisma/client").$Enums.ServiceRequestType;
        notes: string | null;
        requestedAt: Date;
        completedAt: Date | null;
    }>;
    update(id: string, updateServiceRequestDto: UpdateServiceRequestDto): Promise<{
        booking: {
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
            createdBy: {
                id: string;
                username: string;
                role: import(".prisma/client").$Enums.UserRole;
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
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.ServiceRequestStatus;
        description: string | null;
        bookingId: string;
        requestType: import(".prisma/client").$Enums.ServiceRequestType;
        notes: string | null;
        requestedAt: Date;
        completedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.ServiceRequestStatus;
        description: string | null;
        bookingId: string;
        requestType: import(".prisma/client").$Enums.ServiceRequestType;
        notes: string | null;
        requestedAt: Date;
        completedAt: Date | null;
    }>;
    getServiceStats(): Promise<{
        totalRequests: number;
        pendingRequests: number;
        completedRequests: number;
    }>;
    getRequestsByType(): Promise<{
        type: import(".prisma/client").$Enums.ServiceRequestType;
        count: number;
    }[]>;
}
