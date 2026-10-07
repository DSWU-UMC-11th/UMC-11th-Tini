import { Injectable, NotFoundException } from '@nestjs/common';
import { RentalRepository } from './rental.repository';

@Injectable()
export class RentalService {
  constructor(private readonly rentalRepository: RentalRepository) {}

  async createRental(body: Record<string, any>): Promise<any> {
    const result = await this.rentalRepository.create(body);
    return {
      message: '대여 기록이 생성되었습니다!',
      rentalId: result.insertId,
    };
  }

  async returnRental(rentalId: number): Promise<any> {
    const result = await this.rentalRepository.markReturned(rentalId);
    if (result.affectedRows === 0) {
      throw new NotFoundException(`${rentalId}번 대여 기록이 없습니다.`);
    }
    return { message: '반납 처리되었습니다!', rentalId };
  }
}
