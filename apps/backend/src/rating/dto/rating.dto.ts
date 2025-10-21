import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateStayRatingDto {
  @IsString()
  bookingId: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  feedback?: string;
}
