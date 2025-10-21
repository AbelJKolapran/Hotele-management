import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ServiceRequestType, ServiceRequestStatus } from '@prisma/client';

export class CreateServiceRequestDto {
  @IsEnum(ServiceRequestType)
  requestType: ServiceRequestType;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateServiceRequestDto {
  @IsOptional()
  @IsEnum(ServiceRequestStatus)
  status?: ServiceRequestStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
