# ryu-s-wallet

## 프로젝트 개요

이더리움 테스트넷을 활용하여 블록체인 지갑생성 및 erc20 기본적인 핸들링 및 경험을 할수있는<br>안드로이드 앱 개발

프론트: react-native
백엔드: nestjs  
블록체인테스트넷: eth sepolia test

## 관련 문서

[요구사항 명세](./document//Requirements.md)

#### 유저

    - 회원가입
        - 이메일 인증 혹은 oauth2 소셜 인증으로 회원가입 가능

    - 로그인
        - 이메일 계정 혹은 oauth2 소셜 인증으로 로그인 가능

    - 로그아웃
        - 로그인된 세션을 로그아웃 처리

    - 정보수정
        - 본인의 계정 정보를 수정

    - 회원탈퇴
        - 회원 탈퇴 기능, 당일 복구 가능 및 이후 복구 불가능

#### 블록체인

    - 블록체인 지갑생성
        - 첫 로그인시 지갑생성 및 지갑부여
          부여된 지갑은 복구키로 metamask 등의 다른 지갑 플랫폼에서 사용 가능

    - 테스트 코인 지급
        - 이용자는 매일 출석체크를 통하여 1개의 테스트 코인을 지급 받을 수 있음

    - 트랜잭션 생성 및 전파 (토큰 거래)
        - 이용자는 자신이 보유한 코인을 다른지갑으로 전송할수 있음
          단, 이 경우 해당 테스트넷의 테스트 이더리움을 보유하여야 함
          (테스트넷 이더리움 제공 받기 - )
