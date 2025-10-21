import { BookingStatus, PaymentStatus } from '@prisma/client';
export declare class CreateBookingDto {
    guestName: string;
    guestEmail?: string;
    phoneNumber: string;
    roomId: string;
    checkIn: string;
    checkOut: string;
    paymentStatus?: PaymentStatus;
    specialRequests?: string;
}
export declare class UpdateBookingDto {
    guestName?: string;
    guestEmail?: string;
    phoneNumber?: string;
    roomId?: string;
    checkIn?: string;
    checkOut?: string;
    status?: BookingStatus;
    paymentStatus?: PaymentStatus;
    specialRequests?: string;
}
