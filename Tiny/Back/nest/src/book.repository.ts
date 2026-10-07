import { Injectable, Inject } from '@nestjs/common';
import type { Pool, ResultSetHeader } from 'mysql2/promise';
import { DATABASE_CONNECTION } from './database.provider';

@Injectable()
export class BookRepository {
  constructor(@Inject(DATABASE_CONNECTION) private readonly pool: Pool) {}

  async findAll(): Promise<any> {
    const sql = 'SELECT * FROM book';
    const [rows] = await this.pool.query(sql);
    return rows;
  }

  async create(body: Record<string, any>): Promise<ResultSetHeader> {
    const sql =
      'INSERT INTO book (category_id, title, description, is_available) VALUES (?, ?, ?, true)';
    const [result] = await this.pool.execute<ResultSetHeader>(sql, [
      body.categoryId,
      body.title,
      body.description,
    ]);
    return result;
  }

  // 미션 1: 특정 카테고리 도서 조회
  async findByCategory(categoryId: number): Promise<any> {
    const sql = 'SELECT * FROM book WHERE category_id = ?';
    const [rows] = await this.pool.execute(sql, [categoryId]);
    return rows;
  }
}
