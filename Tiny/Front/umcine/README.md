# UMCine

UMC 11th Web 파트 주차별 미션으로 구현한 영화 목록 서비스입니다. (2~4주차 동일 프로젝트에서 이어서 작업)

## 2주차 - React 컴포넌트 및 상태 기반 UI 구성

### 학습 내용

- JSX/TSX 문법, 컴포넌트 정의 및 부모-자식 관계
- props를 이용한 데이터 전달 및 TypeScript 타입 지정
- 조건부 렌더링, `map()`을 이용한 목록 렌더링
- `useState`를 활용한 이벤트 처리 및 상태 관리
- 배열 상태의 불변성 유지 업데이트 (`map`, 전개 문법)
- 상태 끌어올리기, Context API를 이용한 값 전달

### 미션: UMCine 영화 목록 화면 구현

- `Header`, `MovieGrid`, `MovieCard`, `Pagination` 컴포넌트로 역할 분리
- 영화 데이터 10편을 `movies.map()`으로 목록 렌더링
- `useState` + props로 영화별 북마크 상태 토글 기능 구현
- 상태는 `App` 컴포넌트에서 관리(Single Source of Truth), 자식은 props로 값과 핸들러 전달받아 사용

### 선택 미션

- 미디어 쿼리로 화면 너비에 따른 반응형 그리드(3열/2열/1열) 적용
- `useState`로 현재 페이지 관리, 선택된 페이지 번호만 활성 스타일 표시

## 3주차 - TanStack Router & Tailwind CSS

### 구현 내용

- **파일 기반 라우팅 (TanStack Router)**
  - `/` 영화 목록, `/search?query=...` 검색, `/movies/$movieId` 영화 상세
  - `__root.tsx`에서 `Header` + `Outlet` 공통 레이아웃, 없는 경로는 `notFoundComponent` 처리
- **검색**: `validateSearch`로 `query`를 검증하고, 검색어를 URL search param에 반영 (새로고침·뒤로 가기 시에도 유지)
- **영화 상세**: path param `movieId`로 로컬 데이터를 조회하고, 없는 ID는 "영화를 찾을 수 없어요." 표시
- **화면 이동**: `Link`로 헤더, 영화 카드, 검색 결과에서 SPA 방식 이동
- **Tailwind CSS v4 적용**
  - 기존 CSS를 utility class로 전환하고 `App.css` 제거
  - `cn`(clsx + tailwind-merge)으로 북마크, 페이지네이션 등 상태별 class 조합
  - 반응형 그리드 (1열 → 2열 → 3열 → 5열)
- **선택 미션**: 현재 route에 맞는 헤더 메뉴 활성 스타일, 모바일 대응

### 폴더 구조

```
src/
├── routes/      # URL 규칙 (__root, index, search, movies.$movieId)
├── pages/       # 화면 단위 컴포넌트
├── components/  # layout, movies 공통 컴포넌트
├── data/ types/ utils/
```

## 4주차 - Web Storage 및 Zustand 상태 관리

### 구현 내용

- **북마크 상태 분리**: 영화 객체의 `isBookmarked` 대신 북마크된 영화 ID 배열(`number[]`)로 관리
- **Zustand store**: `src/stores/bookmark-store.ts`에 `bookmarkedMovieIds`와 `toggleBookmark` action 작성
- **화면 간 상태 공유**: 목록, 검색, 상세 화면이 같은 store를 사용해 북마크 상태가 동일하게 반영
- **북마크 버튼 컴포넌트**: `BookmarkButton`을 만들어 목록 카드와 검색 결과에서 재사용 (selector로 필요한 값만 구독)
- **persist 적용**: `localStorage`의 `umcine-bookmark-store` 키에 북마크 ID만 저장해 새로고침과 브라우저 재실행 후에도 유지
- **저장값 검증**: `readBookmarkIds()`에서 `try...catch`와 배열·양의 정수 검사로 잘못된 저장값을 빈 배열로 복구
- **포스터 비율 고정**: `aspect-2/3`로 카드 포스터 높이 통일

### 선택 미션

- `sessionStorage`로 바꿔 탭 닫기·새 탭·재실행 시 localStorage와의 차이 비교
- 카드 크기(크게/작게) 설정을 별도 store(`umcine-view-settings`)로 추가해 브라우저에 저장

### 확인

- 저장값 삭제 시 초기 빈 상태로 복귀
- `pnpm build` 성공
