import { PrismaService } from '../common/prisma/prisma.service';
import { CreateRoomDto, UpdateRoomDto } from './dto/room.dto';
export declare class RoomService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoomDto: CreateRoomDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomNumber: string;
        roomType: import(".prisma/client").$Enums.RoomType;
        status: import(".prisma/client").$Enums.RoomStatus;
        price: number;
        description: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomNumber: string;
        roomType: import(".prisma/client").$Enums.RoomType;
        status: import(".prisma/client").$Enums.RoomStatus;
        price: number;
        description: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomNumber: string;
        roomType: import(".prisma/client").$Enums.RoomType;
        status: import(".prisma/client").$Enums.RoomStatus;
        price: number;
        description: string | null;
    }>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomNumber: string;
        roomType: import(".prisma/client").$Enums.RoomType;
        status: import(".prisma/client").$Enums.RoomStatus;
        price: number;
        description: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomNumber: string;
        roomType: import(".prisma/client").$Enums.RoomType;
        status: import(".prisma/client").$Enums.RoomStatus;
        price: number;
        description: string | null;
    }>;
    getRoomStats(): Promise<{
        totalRooms: number;
        availableRooms: number;
        occupiedRooms: number;
        cleaningRooms: number;
    }>;
    getAvailableRooms(checkIn: Date, checkOut: Date): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roomNumber: string;
        roomType: import(".prisma/client").$Enums.RoomType;
        status: import(".prisma/client").$Enums.RoomStatus;
        price: number;
        description: string | null;
    }[]>;
}
