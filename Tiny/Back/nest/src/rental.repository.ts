import { Injectable, Inject } from '@nestjs/common';
import type { Pool, ResultSetHeader } from 'mysql2/promise';
import { DATABASE_CONNECTION } from './database.provider';

@Injectable()
export class RentalRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly pool: Pool) {}

  // rental_id는 AUTO_INCREMENT라 생략, returned_at은 NULL 허용이라 생략
  // NOW()와 DATE_ADD()는 DB가 계산하는 값이라 ? 자리에 넣지 않음
  async create(body: Record<string, any>): Promise<ResultSetHeader> {
    const sql =
      'INSERT INTO rental (user_id, book_id, rented_at, due_at) VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))';
    const [result] = await this.pool.execute<ResultSetHeader>(sql, [
      body.userId,
      body.bookId,
    ]);
    return result;
  }

  async markReturned(rentalId: number): Promise<ResultSetHeader> {
    const sql = 'UPDATE rental SET returned_at = NOW() WHERE rental_id = ?';
    const [result] = await this.pool.execute<ResultSetHeader>(sql, [rentalId]);
    return result;
  }
}
