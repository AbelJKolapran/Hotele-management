import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard } from '../auth/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    return this.bookingService.create(createBookingDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.bookingService.getBookingStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Get('booking-id/:bookingId')
  findByBookingId(@Param('bookingId') bookingId: string) {
    return this.bookingService.findByBookingId(bookingId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(id, updateBookingDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id/check-in')
  checkIn(@Param('id') id: string) {
    return this.bookingService.checkIn(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id/check-out')
  checkOut(@Param('id') id: string) {
    return this.bookingService.checkOut(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id/complete')
  completeStay(@Param('id') id: string) {
    return this.bookingService.completeStay(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(id);
  }
}
