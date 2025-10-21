import { IsString, IsEnum, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { RoomType, RoomStatus } from '@prisma/client';

export class CreateRoomDto {
  @IsString()
  roomNumber: string;

  @IsEnum(RoomType)
  roomType: RoomType;

  @IsEnum(RoomStatus)
  status: RoomStatus;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  roomNumber?: string;

  @IsOptional()
  @IsEnum(RoomType)
  roomType?: RoomType;

  @IsOptional()
  @IsEnum(RoomStatus)
  status?: RoomStatus;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class GetAvailableRoomsDto {
  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;
}
