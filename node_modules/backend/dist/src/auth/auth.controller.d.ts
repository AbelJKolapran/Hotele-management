import { AuthService, AdminLoginDto, UserLoginDto } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    createAdmin(createAdminDto: {
        username: string;
        password: string;
        role: string;
    }): Promise<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getProfile(req: any): any;
}
