"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../common/prisma/prisma.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async validateAdmin(username, password) {
        const user = await this.prisma.user.findUnique({
            where: { username },
        });
        if (user && await bcrypt.compare(password, user.password)) {
            const { password: _, ...result } = user;
            return result;
        }
        return null;
    }
    async validateUser(bookingId, phoneNumber) {
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
    async loginAdmin(adminLoginDto) {
        const user = await this.validateAdmin(adminLoginDto.username, adminLoginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
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
    async loginUser(userLoginDto) {
        const booking = await this.validateUser(userLoginDto.bookingId, userLoginDto.phoneNumber);
        if (!booking) {
            throw new common_1.UnauthorizedException('Invalid booking ID or phone number');
        }
        const payload = {
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
    async createAdmin(username, password, role) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role: role,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map