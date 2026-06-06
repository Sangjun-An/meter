# 거리 측정 앱 (Distance Meter)

OpenStreetMap Nominatim API를 사용한 웹 기반 거리 측정 애플리케이션입니다.

## 기능

- ✅ 출발지와 도착지 검색 (실제 지명만 인식)
- ✅ 두 위치 간 직선거리 계산 (Haversine 공식)
- ✅ OpenStreetMap에서 경로 보기 (지도 링크)
- ✅ 모바일 반응형 디자인
- ✅ Netlify 배포 준비 완료

## 사용 방법

### 웹 앱 (추천)
```bash
# 로컬 실행
python -m http.server 8000
# http://localhost:8000 접속
```

### 실행 파일
```bash
# dist/DistanceApp.exe 더블 클릭
# 또는 터미널에서
python run_app.py
```

## 배포 (Netlify)

1. GitHub 레포지토리 연결
2. Netlify 설정 자동 감지 (netlify.toml)
3. 배포 완료

## 기술 스택

- HTML5 / CSS3 / JavaScript (ES6+)
- Nominatim API (OpenStreetMap)
- Haversine 거리 계산
- PyInstaller (실행 파일 빌드)

## 파일 구조

```
meter/
├── index.html          # 메인 페이지
├── styles.css          # 스타일
├── script.js           # 거리 계산 로직
├── run_app.py          # 로컬 서버 래퍼
├── netlify.toml        # Netlify 설정
├── .gitignore          # Git 제외 파일
└── README.md           # 이 파일
```

## 라이센스

MIT
