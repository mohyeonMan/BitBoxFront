# BitBox Project
CGV와 메가박스를 Mix한 가상의 영화관 "BitBox"의 영화정보와 예매 및 상품구매를 위한 웹사이트개발 프로젝트입니다.

## 👨 구성원
- 팀장 - [최승빈]
- 팀원 - [박지훈], [이원국], [조장현], [김범기], [박찬호], [김묘선], [김보영], [이용식], [정주용]

## 📅 프로젝트 기간
- 2022.12.26 ~ 2023.01.19

## ⚙️ 개발 환경
- Language : Java 11, JavaScript(EC6)
- FE : React.js yarn
- BE : SpringBoot maven
- Database : Oracle Cloud DB
- ORM : Spring data JPA
- IDE : STS 4, Visual Studio Code, SQL developer
- Deploy : netlify, heroku 
- Etc : Git, Github 

## 🔧 구현 기능 및 기여

### [박지훈]
1. 좌석예매 구현
   - 일반과 청소년으로 분리하여 좌석선택
   - 현재 좌석선택 현황과 가격확인
   - 상영예정내역과 고객예매내역 DB설계
   - iamport 이니시스 api로 테스트결제 구현
   - 결제완료시 해당 좌석정보 변경, 메시지 알림
2. myPage 중 예약 내역
   - 상영예정, 상영완료로 구분하여 확인가능
   - 상영예정인 예약 클릭해 QR코드 입장권확인
   - 상영시간 지날 시 상영완료로 변경
3. 배포
   - 프로젝트 발표 후 배포 진행
   - webServer : netlify
   - was : heroku
