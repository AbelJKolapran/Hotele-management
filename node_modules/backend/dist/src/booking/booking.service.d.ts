import { PrismaService } from '../common/prisma/prisma.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
export declare class BookingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createBookingDto: CreateBookingDto, createdById: string): Promise<{
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
    }>;
    findAll(): Promise<({
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
        serviceRequests: {
            id: string;
            status: import(".prisma/client").$Enums.ServiceRequestStatus;
            description: string | null;
            bookingId: string;
            requestType: import(".prisma/client").$Enums.ServiceRequestType;
            notes: string | null;
            requestedAt: Date;
            completedAt: Date | null;
        }[];
        stayRating: {
            id: string;
            createdAt: Date;
            bookingId: string;
            rating: number;
            feedback: string | null;
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
    })[]>;
    findOne(id: string): Promise<{
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
        serviceRequests: {
            id: string;
            status: import(".prisma/client").$Enums.ServiceRequestStatus;
            description: string | null;
            bookingId: string;
            requestType: import(".prisma/client").$Enums.ServiceRequestType;
            notes: string | null;
            requestedAt: Date;
            completedAt: Date | null;
        }[];
        stayRating: {
            id: string;
            createdAt: Date;
            bookingId: string;
            rating: number;
            feedback: string | null;
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
    findByBookingId(bookingId: string): Promise<{
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
        serviceRequests: {
            id: string;
            status: import(".prisma/client").$Enums.ServiceRequestStatus;
            description: string | null;
            bookingId: string;
            requestType: import(".prisma/client").$Enums.ServiceRequestType;
            notes: string | null;
            requestedAt: Date;
            completedAt: Date | null;
        }[];
        stayRating: {
            id: string;
            createdAt: Date;
            bookingId: string;
            rating: number;
            feedback: string | null;
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
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<{
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
        serviceRequests: {
            id: string;
            status: import(".prisma/client").$Enums.ServiceRequestStatus;
            description: string | null;
            bookingId: string;
            requestType: import(".prisma/client").$Enums.ServiceRequestType;
            notes: string | null;
            requestedAt: Date;
            completedAt: Date | null;
        }[];
        stayRating: {
            id: string;
            createdAt: Date;
            bookingId: string;
            rating: number;
            feedback: string | null;
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
    remove(id: string): Promise<{
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
    checkIn(id: string): Promise<{
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
    }>;
    checkOut(id: string): Promise<{
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
    }>;
    completeStay(id: string): Promise<{
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
    }>;
    getBookingStats(): Promise<{
        totalBookings: number;
        activeBookings: number;
        checkedInBookings: number;
        completedBookings: number;
    }>;
    private generateBookingId;
}
