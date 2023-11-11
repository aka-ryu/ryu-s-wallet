## API 엔드포인트

<table border="1">
	<th>FUNCTION</th>
	<th>METHOD</th>
	<th>API</th>
	<th>PARAM</th>
	<th>RESPONSE</th>
	<tr>
	    <td>회원가입</td>
	    <td>POST</td>
	    <td>/user/signup</td>
	    <td>
            body - email, password
        </td>
	    <td>
           { message-string, result-string }
        </td>
	</tr>
	<tr>
	    <td>로그인</td>
	    <td>POST</td>
	    <td>/auth/signin</td>
	    <td>
            body - email, password
        </td>
	    <td>
           { message - string, result - string, [data] } <br><br>
		   data <br>  token - string<br> is_wallet - int<br>is_first_reword - int<br>walletAddress - string<br> balance - string
        </td>
	</tr>
	<tr>
	    <td>비밀번호 찾기</td>
	    <td>POST</td>
	    <td>/user/change/password</td>
	    <td>
            body - email, password
        </td>
	    <td>
           { message - string, result - string }
        </td>
	</tr>
	<tr>
	    <td>인증코드 받기</td>
	    <td>POST</td>
	    <td>/email/send/verifycode</td>
	    <td>
           body - email, type
        </td>
	    <td>
          { message - string, result - string } <br>
        </td>
	</tr>
	<tr>
	    <td>인증코드 확인</td>
	    <td>POST</td>
	    <td>/email/check/code</td>
	    <td>
           body - email, type, code
        </td>
	    <td>
          { message - string, result - string } <br>
        </td>
	</tr>
	<tr>
	    <td>지갑 생성</td>
	    <td>GET</td>
	    <td>/blockchain/wallet/create</td>
	    <td>
            header - 'Authorization' : `Bearer ${jwt}`
        </td>
	    <td>
          { message - string, result - string, [data] } <br><br>
		   data <br>  mnemonic - string<br> address - string
        </td>
	</tr>
	<tr>
	    <td>지갑 가져오기</td>
	    <td>POST</td>
	    <td>'/blockchain/wallet/import</td>
	    <td>
            header - 'Authorization' : `Bearer ${jwt}`<br>
			body - value (mnemonic)
        </td>
	    <td>
          { message - string, result - string, [data] } <br><br>
		   data <br>  address - string
        </td>
	</tr>
	<tr>
	    <td>잔액갱신</td>
	    <td>GET</td>
	    <td>'/blockchain/get/balance</td>
	    <td>
            header - 'Authorization' : `Bearer ${jwt}`<br>
        </td>
	    <td>
          { message - string, result - string, [data] } <br><br>
		   data <br>  balance - string
        </td>
	</tr>
	<tr>
	    <td>출석체크</td>
	    <td>GET</td>
	    <td>'/blockchain/attendance/check</td>
	    <td>
            header - 'Authorization' : `Bearer ${jwt}`<br>
        </td>
	    <td>
          { message - string, result - string, [data] } <br><br>
		   data - transaction[] <br>
		   transaction<br> 
			id - int<br>
			user_id - int<br>
			tx_id - string<br>
			send_type - string<br>
			result - int<br>
			retry - int<br>
			created_at - date<br>
			updated_at - date<br>
        </td>
	</tr>
	<tr>
	    <td>커피쿠폰 받기</td>
	    <td>GET</td>
	    <td>'/email/coffee/code</td>
	    <td>
            header - 'Authorization' : `Bearer ${jwt}`<br>
        </td>
	    <td>
          { message - string, result - string } <br><br>
        </td>
	</tr>
	
</table>
