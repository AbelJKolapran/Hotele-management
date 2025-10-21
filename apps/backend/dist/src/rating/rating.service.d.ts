import { PrismaService } from '../common/prisma/prisma.service';
import { CreateStayRatingDto } from './dto/rating.dto';
export declare class RatingService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createStayRatingDto: CreateStayRatingDto): Promise<{
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
        createdAt: Date;
        bookingId: string;
        rating: number;
        feedback: string | null;
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
        createdAt: Date;
        bookingId: string;
        rating: number;
        feedback: string | null;
    })[]>;
    findByBooking(bookingId: string): Promise<{
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
        createdAt: Date;
        bookingId: string;
        rating: number;
        feedback: string | null;
    }>;
    getRatingStats(): Promise<{
        totalRatings: number;
        averageRating: number;
        ratingDistribution: {
            rating: number;
            count: number;
        }[];
    }>;
}
