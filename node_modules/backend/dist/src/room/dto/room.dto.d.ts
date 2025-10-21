import { RoomType, RoomStatus } from '@prisma/client';
export declare class CreateRoomDto {
    roomNumber: string;
    roomType: RoomType;
    status: RoomStatus;
    price: number;
    description?: string;
}
export declare class UpdateRoomDto {
    roomNumber?: string;
    roomType?: RoomType;
    status?: RoomStatus;
    price?: number;
    description?: string;
}
export declare class GetAvailableRoomsDto {
    checkIn: string;
    checkOut: string;
}
