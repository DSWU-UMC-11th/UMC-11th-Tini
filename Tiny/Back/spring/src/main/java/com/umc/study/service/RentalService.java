package com.umc.study.service;

import com.umc.study.repository.RentalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class RentalService {

    private final RentalRepository rentalRepository;

    // 미션 2
    public void createRental(Map<String, Object> body) {
        rentalRepository.save(body);
    }

    // 선택 미션
    public void returnRental(Long rentalId) {
        int updated = rentalRepository.markReturned(rentalId);
        if (updated == 0) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, rentalId + "번 대여 기록이 없거나 이미 반납되었습니다.");
        }
    }
}