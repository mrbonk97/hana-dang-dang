export const Footer = () => {
  return (
    <footer className="pt-10 opacity-60 px-20 h-40 w-full text-xs">
      <ul className="text-xs w-full flex justify-between">
        <li>
          <strong>개인정보 처리방침</strong>
        </li>
        <li>고객센터 1599-7987</li>
        <li>공지사항</li>
        <li>자주 묻는 질문</li>
        <li>투자 유의사항</li>
        <li>이용자권리 및 유의사항</li>
        <li>신용정보 활용체제</li>
        <li>하나증권</li>
      </ul>
      <p className="pt-5 text-center">
        사업자 등록번호 : 116-81-05992 주소 : 서울특별시 영등포구 의사당대로
        82(여의도동)
      </p>
      <p className="pt-3 text-center">
        하나증권에서 제공하는 투자 정보는 고객의 투자 판단을 위한 단순 참고용일
        뿐, 투자 제안 및 권유, 종목 추천을 위해 작성된 것이 아닙니다.
      </p>
    </footer>
  );
};
