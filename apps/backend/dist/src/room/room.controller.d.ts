import { RoomService } from './room.service';
import { CreateRoomDto, UpdateRoomDto, GetAvailableRoomsDto } from './dto/room.dto';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
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
    getStats(): Promise<{
        totalRooms: number;
        availableRooms: number;
        occupiedRooms: number;
        cleaningRooms: number;
    }>;
    getAvailableRooms(query: GetAvailableRoomsDto): Promise<{
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
}
