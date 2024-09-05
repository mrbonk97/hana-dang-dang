export const REAL_ESTATE_TYPE_LIST = ["아파트", "오피스텔"];

export const JOB_LIST = [
  "정규직 직장인",
  "계약직 직장인",
  "개인사업자",
  "공무원",
  "프리랜서",
  "기타소득자 ・ 무직",
];

export const LOAN_STEP = [
  {
    step: 1,
    title: "직업을 선택하세요",
  },
  {
    step: 2,
    title: "보유한 자산을 입력하면 한도가 늘어나요",
  },
  {
    step: 3,
    title: "직장 ・ 소득 정보",
    description:
      "내게 맞는 금리와 한도 조회를 위해 정보를 정확히 입력해 주세요.",
  },
];

export const REAL_ESTATE_MENU = [
  {
    id: "buy",
    title: "매매",
  },
  {
    id: "rent1",
    title: "전세",
  },
  {
    id: "rent2",
    title: "월세",
  },
];

export const LOAN_TERM = [
  { id: "term-1", title: "본인확인 동의" },
  { id: "term-2", title: "하나은행 개인(신용)정보 처리 동의" },
  { id: "term-3", title: "금융기관 개인(신용)정보 처리 동의" },
  { id: "term-4", title: "금융기관 대안정보 처리 동의" },
  { id: "term-6", title: "정부지원 SGI 개인(신용)정보 처리 동의" },
  { id: "term-7", title: "건강보험공단 정보 가져오기 동의" },
  { id: "term-8", title: "KCB 신용조회 서비스 이용약관" },
];

export const NAV_MENU = [
  { id: "menu1", url: "/loan", title: "대출" },
  { id: "menu2", url: "/jeonse-loan", title: "전세자금대출" },
  { id: "menu3", url: "/real-estate", title: "전세집 찾아보기" },
  { id: "menu4", url: "/prevent-fraud", title: "전세사기 방지" },
  { id: "menu5", url: "/credit-score", title: "신용점수" },
];

export const MAGIC_QUESTION = [
  {
    id: "01",
    question: "고객님께서 대출하고자 하는 대출의 종류는 무엇입니까?",
    option: [
      "내집마련디딤돌대출",
      "신혼부부전용구입자금",
      "신생아특례 디딤돌대출",
    ],
  },
  {
    id: "02-1",
    question:
      "고객님께서는 생애최초 주택 구입자/신혼가구/2자녀(만19세 미만)이상 가구이십니까?",
    option: ["예", "아니오"],
  },
  {
    id: "02-2",
    question: "고객님께서는 생애최초로 주택을 구입하는 신혼가구이십니까?",
    option: ["예", "아니오"],
  },
  {
    id: "02-3",
    question: "대출접수일기준 2년 내 자녀를 출산하셨습니까?",
    option: ["예", "아니오"],
  },
  {
    id: "03",
    question: "고객님의 직업(소득기준)은 무엇입니까?",
    option: [
      "근로·사업·연금소득자",
      "2종류이상소득자",
      "무소득 또는 소득 추정이 곤란한 경우 포함",
    ],
  },
  {
    id: "04",
    question: "고객님은 주민등록등본상 세대주 이십니까?",
    option: ["예", "아니오"],
  },
  {
    id: "05",
    question:
      "고객님은 상여금을 포함한 배우자 합산 연소득이 1.3억원 이하, 순자산가액 4.69억원 이하이십니까?",
    option: ["예", "아니오"],
  },
  {
    id: "06",
    question:
      "구입하고자 하는 주택의 전용면적이 85m²이하(수도권을 제외한 도시지역이 아닌 읍 또는 면 지역 100m²이하) 이십니까?",
    option: ["예", "아니오"],
  },
  {
    id: "07",
    question: "구입하고자 하는 주택 유형이 무엇입니까?",
    option: ["아파트", "다세대", "연립주택", "단독주택"],
  },
];

export const TOP_MENU = [
  {
    id: "loan",
    url: "/loan",
    title: "전세자금대출",
    submenu: [
      {
        id: "jeonse-loan/1",
        url: "/jeonse-loan/1",
        title: "버팀목전세자금",
      },
      {
        id: "jeonse-loan/2",
        url: "/jeonse-loan/2",
        title: "신혼부부전용 전세자금",
      },
      {
        id: "jeonse-loan/3",
        url: "/jeonse-loan/3",
        title: "중소기업청년 전월세보증금대출",
      },
      {
        id: "jeonse-loan/4",
        url: "/jeonse-loan/4",
        title: "청년전용 버팀목전세자금",
      },
      {
        id: "jeonse-loan/5",
        url: "/jeonse-loan/5",
        title: "청년전용 보증부월세대출",
      },
      {
        id: "jeonse-loan/6",
        url: "/jeonse-loan/6",
        title: "신생아 특례 버팀목대출",
      },
    ],
  },
  {
    id: "real-estate",
    url: "/real-estate",
    title: "전세집 찾아보기",
    submenu: [],
  },
  {
    id: "fraud",
    url: "/fraud",
    title: "전세사기 방지",
    submenu: [],
  },
];

export const CHAT_MESSAGE = [
  {
    id: "1",
    title: null,
    message:
      "안녕하세요. 하나깔깔 전세 대출 챗봇입니다.\n최적의 대출 상품을 알기 위해서는 3분 정도면 충분해요. 잘 따라와주세요!😎",
    modal: null,
  },
  {
    id: "2",
    title: "먼저 휴대폰 본인확인을 진행해주세요.",
    message: "한도와 금리를 조회해도 개인신용점수에는 영향을 주지 않아요",
    modal: "휴대폰 본인 확인",
  },
  {
    id: "3",
    title: null,
    message: "본인확인이 완료되었습니다. 이제 몇 가지 질문을 시작할게요.",
    modal: null,
  },
  {
    id: "4",
    title: "우선, 대출 목적을 알려주세요.",
    message:
      "보유하고 있는 전월세대출이 없다면 새로 받기를, 다른 은행의 전월세 대출이 있다면 갈아타기를 눌러주세요.",
    modal: null,
    button: [
      {
        action: "새로받기",
        message: "전월세대출 새로 받기",
      },
      {
        action: "갈아타기",
        message: "전월세대출 갈아타기",
      },
    ],
  },
  {
    id: "5",
    title: "새로운 집으로 이사 예정이신가요?",
    message: "이사 여부에 따라 대출 한도가 달라집니다.",
    button: [
      {
        action: "이사yes",
        message: "이사 예정입니다.",
      },
      {
        action: "이사no",
        message: "현재 집에 계속 거주합니다.",
      },
    ],
  },
  {
    id: "6",
    title: "전월세보증금 대출을 받으려는 집의 계약 방식을 알려주세요",
    message: null,
    button: [
      {
        action: "공인중개업소",
        message: "공인중개업소",
      },
      {
        action: "공공주택사업자",
        message: "공공주택사업자",
      },
      {
        action: "개인",
        message: "개인",
      },
    ],
  },
  {
    id: "7",
    title: "전웰세보증금 대출을 받으려는 집 유형은 무엇인가요?",
    message: null,
    button: [
      {
        action: "아파트",
        message: "아파트",
      },
      {
        action: "오피스텔",
        message: "오피스텔",
      },
      {
        action: "빌라, 단독주택 등",
        message: "빌라, 단독주택 등",
      },
    ],
  },
  {
    id: "7",
    title: "기준 보증금은 얼마인가요?",
    message: null,
    button: null,
  },
  {
    id: "8",
    title: "재개약하신 보증금은 얼마인가요?",
    message:
      "재계약의 경우, 재계약 보증금이 기존 보증금보다 500만원 이상 인상된 경우 대출이 가능합니다.",
    button: null,
  },
  {
    id: "9",
    title: "임대차계약서에 쓰여있는 잔금일을 알려주세요",
    message: "대출 조회는 잔금일 3개월 전부터 조회 가능합니다.",
    button: null,
  },
  {
    id: "10",
    title: "소득 정보를 확인할게요.",
    message: null,
    button: [{}],
  },
  {
    id: "11",
    title: "연소득이 얼마인지 알려주세요.",
    message: null,
    button: null,
  },
  {
    id: "12",
    title: "결혼 여부를 알려주세요.",
    message: null,
    button: null,
  },
  {
    id: "13",
    title: "주택 보유 수를 알려주세요.",
    message: null,
    button: null,
  },
  {
    id: "14",
    title: null,
    message: "한도 및 금리 조회에 필요한 모든 정보를 확인했어요.",
    button: null,
  },
  {
    id: "15",
    title: "지금까지 입력한 정보를 요약해서 보여드릴게요.",
    message: null,
    button: null,
  },
];

export const CHAT_MESSAGE2 = [
  {
    id: "1",
    title: null,
    message:
      "안녕하세요. 하나깔깔 전월세보증금 대출 챗봇입니다.\n전월세보증금 대출의 금리와 한도를 알기 위햐서는 3분 정도면 충분해요. 잘 따라와주세요!😎",
    modal: null,
  },
  {
    id: "2",
    title: "먼저 휴대폰 본인확인을 진행해주세요.",
    message: "한도와 금리를 조회해도 개인신용점수에는 영향을 주지 않아요",
    modal: "휴대폰 본인 확인",
  },
  {
    id: "3",
    title: null,
    message: "본인확인이 완료되었습니다. 이제 몇 가지 질문을 시작할게요.",
    modal: null,
  },
  {
    id: "4",
    title: "우선, 대출 목적을 알려주세요.",
    message:
      "보유하고 있는 전월세대출이 없다면 새로 받기를, 다른 은행의 전월세 대출이 있다면 갈아타기를 눌러주세요.",
    modal: null,
    button: [
      {
        action: "새로받기",
        message: "전월세대출 새로 받기",
      },
      {
        action: "갈아타기",
        message: "전월세대출 갈아타기",
      },
    ],
  },
  {
    id: "5",
    title: "새로운 집으로 이사 예정이신가요?",
    message: "이사 여부에 따라 대출 한도가 달라집니다.",
    button: [
      {
        action: "이사yes",
        message: "이사 예정입니다.",
      },
      {
        action: "이사no",
        message: "현재 집에 계속 거주합니다.",
      },
    ],
  },
  {
    id: "6",
    title: "전월세보증금 대출을 받으려는 집의 계약 방식을 알려주세요",
    message: null,
    button: [
      {
        action: "공인중개업소",
        message: "공인중개업소",
      },
      {
        action: "공공주택사업자",
        message: "공공주택사업자",
      },
      {
        action: "개인",
        message: "개인",
      },
    ],
  },
  {
    id: "7",
    title: "전웰세보증금 대출을 받으려는 집 유형은 무엇인가요?",
    message: null,
    button: [
      {
        action: "아파트",
        message: "아파트",
      },
      {
        action: "오피스텔",
        message: "오피스텔",
      },
      {
        action: "빌라, 단독주택 등",
        message: "빌라, 단독주택 등",
      },
    ],
  },
  {
    id: "7",
    title: "기준 보증금은 얼마인가요?",
    message: null,
    button: null,
  },
  {
    id: "8",
    title: "재개약하신 보증금은 얼마인가요?",
    message:
      "재계약의 경우, 재계약 보증금이 기존 보증금보다 500만원 이상 인상된 경우 대출이 가능합니다.",
    button: null,
  },
  {
    id: "9",
    title: "임대차계약서에 쓰여있는 잔금일을 알려주세요",
    message: "대출 조회는 잔금일 3개월 전부터 조회 가능합니다.",
    button: null,
  },
  {
    id: "10",
    title: "소득 정보를 확인할게요.",
    message: null,
    button: [{}],
  },
  {
    id: "11",
    title: "연소득이 얼마인지 알려주세요.",
    message: null,
    button: null,
  },
  {
    id: "12",
    title: "결혼 여부를 알려주세요.",
    message: null,
    button: null,
  },
  {
    id: "13",
    title: "주택 보유 수를 알려주세요.",
    message: null,
    button: null,
  },
  {
    id: "14",
    title: null,
    message: "한도 및 금리 조회에 필요한 모든 정보를 확인했어요.",
    button: null,
  },
  {
    id: "15",
    title: "지금까지 입력한 정보를 요약해서 보여드릴게요.",
    message: null,
    button: null,
  },
];

// loan => prequalification
export const PRESTEPS = [
  {
    id: "step01",
    message: "고객님께서 대출하고자 하는 대출의 종류는 무엇입니까?",
    buttons: [
      "중소기업 취업청년",
      "청년전용 버팀목",
      "신혼가구 전용",
      "신생아 특례 버팀목",
      "버팀목",
    ],
  },
];
