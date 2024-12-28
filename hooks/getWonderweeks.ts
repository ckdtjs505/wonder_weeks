export const getWonderweeks = ({day, ...etc } : any) => {
    const birthDate = new Date(day);
    
    // 주차별 범위 정의 (시작 주 ~ 종료 주)
    const weekRanges = [
        { weeks: 1, start: 4, end: 6, 
            title : '감각의 세계',
            problem : "아기 자신이 있는 곳이 엄마의 뱃속이 아니라는 것을 깨닫기 시작해 더 오래 깨어 있고 주변을 살피게 돼요. 또한 반사행동에 의해 온몸을 버둥거리고, 그 움직임에 놀라 울기도 합니다.",
            solution: "엄마의 목소리와 체취만이 아이가 이 낯선 세상에서 친숙하게 느끼는 모든 것이므로 아이를 안아주고 꼭 안아주면 아이가 진정될 수 있어요. 속싸개나 스와들업이 엄마를 그나마 편하게 해 줄 수 있습니다"  },
        { weeks: 2, start: 7, end: 10,
            title : '패턴의 세계',
            problem : "아기가 밤낮을 구분하기 시작해요. 때문에 이전보다 잠들기 어려워질 수 있습니다. 자기 손을 발견하고 만지작거려보고, 같은 소리를 내보는 등 반복 행동을 하는 것을 관찰할 수 있어요. 사물을 뚫어져라 쳐다보기도 하고 알아듣기 힘든 옹알이를 내뱉기도 하지요.",
            solution: "새로운 도전을 하는 것에 대해 아낌없는 격려와 응원을 해주세요."  },
        { weeks: 3, start: 11, end: 14, 
            title : '부드러운 전환의 세계',
            problem : "발달이 빠른 아기는 고개를 가누게 되고, 딸랑이를 쥐여주면 헛손질이지만 흔들 수 있어요. 낮과 밤을 구분할 수 있게 되고, 낮에 잠을 이기려할 수도 있어요.",
            solution: "낮잠과 밤잠을 구분시켜주고 수면 교육을 완성해주기 좋은 시기입니다."  },
        { weeks: 4, start: 15, end: 20,
            title : '이벤트의 세계',
            problem : "자신의 주변에서 일어나는 일에 변화를 느끼고 일상으로 인지해요. 자주 울고 보채며 엄마 곁에만 있으려고 하므로 엄마와 아이 모두 정신적, 육체적으로 힘들 수 있어요. 맘마,빠빠 등 제법 말 같은 옹알이를 하기도하고, 말과 노래가 다르다는 것도 인지합니다.",
            solution: "아이가 다양한 환경과 낯선 사람을 접할 기회를 주는 것이 좋아요."  },
        { weeks: 5, start: 23, end: 27,
            title : '관계의 세계',
            problem : "거리에 대한 감각이 생기는 때라서 높은 곳에 있는 물건은 잡을 수 없다는 걸 알게 돼요. 엄마가 문밖으로 나가버리면 사라졌다고 생각하지만, 눈에 보이지 않아도 엄마의 목소리가 들리면 엄마가 존재한다는 것도 알지요. 또한 이가 나면서 잠들기 힘들어하거나 보챌 수 있는 시기입니다.",
            solution: "아이 곁을 떠날 땐 이유를 설명하거나 목소리를 계속 들려주세요. 까꿍놀이와 숨바꼭질도 좋아요."},
        { weeks: 6, start: 34, end: 38,
            title : '범주의 세계',
            problem : "본격적으로 기기 시작하고, 분리불안이 시작될 수 있어요. 특정 물건, 감각, 동물, 사람을 분류할 수 있다는 것을 알게 돼요. 슬픔, 기쁨, 질투 등 감정도 인식하기 시작하는 시기입니다.",
            solution: "여러 감정과 사물, 생물 등을 탐구할 수 있는 기회를 주세요."},
        { weeks: 7, start: 42, end: 47,
            title : '연속성의 세계',
            problem : "순서와 원리를 인지하는 시기입니다. 삽으로 모래를 퍼서 양동이에 담을 수 있다는 것, 수저로 밥을 먹을 수 있다는 것 등을 알 수 있어요. 사물 및 사람에게 호칭이 있다는 것을 알게 되고, 수면 의식을 심어주기에 아주 좋은 때입니다.",
            solution: "수면 전에 하는 행동들을 하나의 의식처럼 순서를 정해두는 것도 좋아요. 새로운 사물, 사람을 만나게 해주고 어떻게 불러야하는지도 알려주면 열심히 무언가를 부르는 아이를 볼 수 있을 거에요."},
        { weeks: 8, start: 51, end: 55,
            title : '프로그램의 세계',
            problem : "영아기 끝! 유아기가 시작됐어요. 분리불안이 다시 돌아올 수 있는 시기랍니다. 두뇌 영역이 확장되고 새로운 정보를 스펀지처럼 흡수해요. 빨래, 청소, 설거지 등 일상의 일들을 이해하고 따라 하려 하기도 해요.",
            solution: "스스로 옷을 입거나 씻어볼 기회를 주세요."},
        { weeks: 9, start: 60, end: 65,
            title : '원칙의 세계',
            problem : "유독 따라 하기를 좋아하는 때로, 부모님의 일상을 흉내 내기 시작해요. 자기 행동이 특정 결과를 가져온다는 것을 인지하는 거죠. 목표에 도달하기 위해 어떤 방법과 전략을 써야 하는지도 어느 정도 알아요. 아이의 공격적 행동은 두 돌 직전 절정을 이루고 점점 줄어듭니다.",
            solution: "공격성을 보일 때 좋지 않은 행동이란 것을 알려줘서 규칙이란걸 가르칠 필요가 있어요."},
        { weeks: 10, start: 71, end: 76,             
            title : '시스템의 세계',
            problem : "문장을 이해하고, 엄마, 아빠와 의사소통이 가능해져요. 적극적으로 주변을 탐색하려 하는 이때, 아기가 하루 종일 집에만 있는 것은 고역이에요. 부모님을 힘들게 하는 대표적인 행동인 떼쓰기가 본격적으로 시작되는 때입니다. 옷 입기나 양치 등을 할 때 엄마, 아빠가 도와주려하면 싫어할 수도 있어요. 다른 사람의 입장을 이해하고, 위로하기까지도 한답니다.",
            solution: "아이가 원하는 것을 해주세요"},
    ];
    
    const result = {};
    
    for (const range of weekRanges) {
        // 시작 날짜와 끝 날짜 계산
        const startDay = new Date(birthDate);
        startDay.setDate(startDay.getDate() + range.start * 7 ); // 주 시작일로 맞추기
    
        const endDay = new Date(birthDate);
        endDay.setDate(endDay.getDate() - 1 + range.end * 7); // 주 종료일로 맞추기
    
        // 현재 주차 범위의 날짜를 순회하며 객체 생성
        for (
        let currentDate = new Date(startDay);
        currentDate <= endDay;
        currentDate.setDate(currentDate.getDate() + 1)
        ) {
    
            const currentDateStr = currentDate.toISOString().split('T')[0]; // ISO 형식으로 날짜 키 생성

            // 각 날짜를 객체에 추가
            result[currentDateStr] = {
                weeks : range.weeks,
                startingDay: currentDate.toDateString() === startDay.toDateString(),
                endingDay: currentDate.toDateString() === endDay.toDateString(),
                ...etc,
                problem: range.problem, 
                solution: range.solution,
                title : range.title
            };
        }
    }

    const today = new Date().toISOString().split('T')[0];

    result[today] = {
        marked: true,
    };
    
    return result;
}

