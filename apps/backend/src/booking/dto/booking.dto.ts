import { IsString, IsEmail, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { BookingStatus, PaymentStatus } from '@prisma/client';

export class CreateBookingDto {
  @IsString()
  guestName: string;

  @IsOptional()
  @IsEmail()
  guestEmail?: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  roomId: string;

  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsString()
  specialRequests?: string;
}

export class UpdateBookingDto {
  @IsOptional()
  @IsString()
  guestName?: string;

  @IsOptional()
  @IsEmail()
  guestEmail?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  roomId?: string;

  @IsOptional()
  @IsDateString()
  checkIn?: string;

  @IsOptional()
  @IsDateString()
  checkOut?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsEnum(PaymentStatus)
  paymentStatus?: PaymentStatus;

  @IsOptional()
  @IsString()
  specialRequests?: string;
}
