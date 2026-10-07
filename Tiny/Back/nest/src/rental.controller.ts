import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller('rentals')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  // POST http://localhost:3000/rentals
  @Post()
  async createRental(@Body() body: Record<string, any>): Promise<any> {
    return await this.rentalService.createRental(body);
  }

  // PATCH http://localhost:3000/rentals/1/return
  @Patch(':rentalId/return')
  async returnRental(
    @Param('rentalId', ParseIntPipe) rentalId: number,
  ): Promise<any> {
    return await this.rentalService.returnRental(rentalId);
  }
}
