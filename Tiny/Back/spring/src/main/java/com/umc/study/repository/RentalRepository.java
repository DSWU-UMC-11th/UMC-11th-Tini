package com.umc.study.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
@RequiredArgsConstructor
public class RentalRepository {

    private final JdbcTemplate jdbcTemplate;

    // 미션 2: 대여 기록 생성
    // rental_id는 AUTO_INCREMENT라 생략, returned_at은 NULL 허용이라 생략
    // NOW()와 DATE_ADD()는 DB가 계산하는 값이라 ? 자리에 넣지 않음
    public void save(Map<String, Object> body) {
        String sql = "INSERT INTO rental (user_id, book_id, rented_at, due_at) "
                + "VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))";
        jdbcTemplate.update(sql, body.get("userId"), body.get("bookId"));
    }

    // 선택 미션: 반납 처리 (이미 반납된 건은 제외)
    public int markReturned(Long rentalId) {
        String sql = "UPDATE rental SET returned_at = NOW() WHERE rental_id = ? AND returned_at IS NULL";
        return jdbcTemplate.update(sql, rentalId); // 변경된 행 수를 반환
    }
}