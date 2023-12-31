# ryu-s-wallet

## 프로젝트 개요

이더리움 테스트넷을 활용하여 블록체인 지갑생성 및 erc20  
기본적인 핸들링 및 경험을 할수있는 안드로이드 앱 개발

프론트: react-native  
백엔드: nestjs  
블록체인 테스트넷: eth sepolia test  
배포: ec2, rds, playstore

개발 진행일 : 2023/11/3 ~ 2023/11/12

[플레이스토어에서 다운받기](https://play.google.com/store/apps/details?id=com.rwfront&pcampaignid=web_share)

정책문제로 잠시 앱이 게시중단되었습니다.

## 관련 문서

[ - 요구사항 명세](./document//Requirements.md)

[ - 기능 명세](./document//Function.md)

[ - UI](./document/UI.pdf)

[ - ERD](./document//erd.png)

[ - 시스템 아키텍처](./document/system-architecture.png)

[ - API END_POINT](./document/Api.md)

## 주의 사항

<p style='color:red; font-size:20px; font-weight: bold;'>
    새로 만든 지갑에 실제 가치가 있는 코인을 보내거나<br>
    실제 가치가 있는 코인을 보유한 지갑을 등록 하지마세요 !!<br>
    프라이빗키를 저도 보관하지 않고 제공드리지 않습니다.<br>
    실제 가치 코인을 보낸뒤 꺼낼수 없습니다.
  </p>

## 사용자 매뉴얼

- 블록체인 네트워크

  - 앱은 이더리움 테스트넷 sepolia 를 이용합니다.  
    [이더리움 테스트넷 이란?](https://ethereum.org/en/developers/docs/networks/#ethereum-testnets)

  - 다음의 주소에서 sepolia 테스트넷 이더리움을 받을 수 있습니다.  
    (테스트넷의 이더리움은 현금가치가 없습니다.)  
    [faucet 1](https://www.infura.io/faucet/sepolia)  
    [faucet 2](https://sepoliafaucet.com/)

- RYU 코인

  - RYU 코인은 제가 발행한 코인으로 실제 현금가치가 존재하지 않습니다.  
    이 앱 내부에서 핸들링, 테스팅 용도로만 사용됩니다.

  - 메타마스크등 다른 플랫폼에서 해당 코인을 추가하고 수량을 확인하고 싶다면  
    다음의 토큰 계약 주소를 추가하세요.  
    0xa2926bc72576af9d2f69f7df1b9321b8b080b7d0

- 지갑 생성

  - 생성된 지갑은 니모닉으로 메타마스크 등 실제 다른 지갑 플랫폼에서 사용이 가능하지만 권장하지 않습니다. 테스트만 이용해 주세요.  
    프라이빗키를 저도 보관하지 않고 제공드리지 않습니다.<br>
    실제 가치 코인을 보낸뒤 꺼낼수 없습니다.  
     [메타마스크](https://metamask.io/)

- 지갑 등록

  - 니모닉으로 다른 플랫폼에서 생성한 지갑을 등록할수 있습니다.  
    실물 가치를 보유하지 않은 지갑만 등록해서 테스트 해주세요.
    (메타마크스에서 생성 후 가져오기 테스트 하길 권장합니다.)

- 출석 체크

  - 출석 체크 시 RYU 코인이 즉시 지급이 되지 않는 이유는 트랜잭션을 전파하지만  
    채굴까지의 대기 시간이 필요하기 때문입니다.  
    [블록체인 트랜잭션 작동원리](https://upbitcare.com/academy/education/blockchain/198)

  - 트랜잭션은 실패할수도 있습니다.  
    서버에서 10분간격으로 실패한 트랜잭션에 대해 재전송을 하고 있음으로  
    보상이 누락되지 않습니다.

- 트랜잭션 리스트

  - 트랜잭션은 전파 후 대기,성공,실패등의 상태변화를 가집니다.  
    트랜잭션에 지불된 수수료(가스) 등의 더 많은 정보를 확인하고 싶다면  
    이더스캔에서 확인하세요!  
    [메인넷 이더스캔](https://etherscan.io/)  
    [sepolia 테스트넷 이더스캔](https://sepolia.etherscan.io/)

- 커피 쿠폰

  - Ryu 코인 30개 이상을 보유하신 분들은 커피쿠폰을 받으실수 있습니다. (선착순 3명)  
    출석체크당 10코인이 지급되니 3일이 소요됩니다.

  - 커피쿠폰은 빽다방 아메리카노 카카오톡 키프티콘 번호로  
    이메일로 전송됩니다.
