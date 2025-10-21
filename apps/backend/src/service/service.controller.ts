import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceRequestDto, UpdateServiceRequestDto } from './dto/service.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminGuard, UserGuard } from '../auth/jwt-auth.guard';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @UseGuards(JwtAuthGuard, UserGuard)
  @Post()
  create(@Body() createServiceRequestDto: CreateServiceRequestDto, @Request() req) {
    return this.serviceService.create(createServiceRequestDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.serviceService.getServiceStats();
  }

  @Get('by-type')
  getRequestsByType() {
    return this.serviceService.getRequestsByType();
  }

  @UseGuards(JwtAuthGuard, UserGuard)
  @Get('my-requests')
  findByBooking(@Request() req) {
    return this.serviceService.findByBooking(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceRequestDto: UpdateServiceRequestDto) {
    return this.serviceService.update(id, updateServiceRequestDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceService.remove(id);
  }
}
