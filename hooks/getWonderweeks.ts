export const getWonderweeks = ({day, color } : any) => {
    const birthDate = new Date(day);
    
    // 주차별 범위 정의 (시작 주 ~ 종료 주)
    const weekRanges = [
        { weeks: 1, start: 4, end: 6 },
        { weeks: 2, start: 7, end: 10 },
        { weeks: 3, start: 11, end: 14 },
        { weeks: 4, start: 15, end: 20 },
        { weeks: 5, start: 23, end: 27 },
        { weeks: 6, start: 34, end: 38 },
        { weeks: 7, start: 42, end: 47 },
        { weeks: 8, start: 51, end: 55 },
        { weeks: 9, start: 60, end: 65 },
        { weeks: 10, start: 71, end: 76 },
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

            if( currentDateStr )
            // 각 날짜를 객체에 추가
            result[currentDateStr] = {
                startingDay: currentDate.toDateString() === startDay.toDateString(),
                endingDay: currentDate.toDateString() === endDay.toDateString(),
                color : color
            };
        }
    }
    
    return result;
}

