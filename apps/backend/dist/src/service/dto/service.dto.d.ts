import { ServiceRequestType, ServiceRequestStatus } from '@prisma/client';
export declare class CreateServiceRequestDto {
    requestType: ServiceRequestType;
    description?: string;
}
export declare class UpdateServiceRequestDto {
    status?: ServiceRequestStatus;
    notes?: string;
}
