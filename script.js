document.getElementById("generateBtn").addEventListener("click", generateRoutine);
document.getElementById("saveBtn").addEventListener("click", saveRoutine);

// 🔥 MBTI별 특화 데이터
const mbtiDescriptions = {
  INFP: ["감성 충전", "혼자만의 시간", "창작 활동"],
  ESTJ: ["목표 달성", "체계적인 일정", "리더십 활동"],
  INTJ: ["전략적 사고", "깊은 집중", "계획 설계"],
  ENFP: ["새로운 경험", "사람들과 교류", "아이디어 폭발"],
  ISTJ: ["책임감 있는 업무", "루틴 유지", "정리정돈"],
  ESFP: ["즐거움 추구", "외부 활동", "사교 활동"],
  INFJ: ["의미 있는 활동", "깊은 사고", "자기 성찰"],
  ENTP: ["토론", "아이디어 실험", "새로운 시도"],
  ISFJ: ["안정적인 일상", "타인 배려", "조용한 시간"],
  ENTJ: ["성과 중심", "리더십", "목표 관리"],
  ISFP: ["예술적 활동", "자유로운 시간", "감각적 경험"],
  ESTP: ["액티비티", "즉흥 행동", "도전"],
  INTP: ["분석", "탐구", "지식 확장"],
  ENFJ: ["사람 중심 활동", "커뮤니케이션", "성장 지원"],
  ISTP: ["문제 해결", "실용적 활동", "기술 활용"],
  ESFJ: ["관계 유지", "사교", "협력"]
};

function generateRoutine() {
  const mbti = document.getElementById("mbti").value;
  const style = document.getElementById("style").value;
  const resultDiv = document.getElementById("result");

  if (!mbti) {
    alert("MBTI를 선택해주세요!");
    return;
  }

  const traits = {
    EI: mbti[0],
    SN: mbti[1],
    TF: mbti[2],
    JP: mbti[3]
  };

  let routine = {
    morning: [],
    day: [],
    evening: [],
    night: []
  };

  // 🔥 공통 로직
  if (traits.EI === "I") {
    routine.morning.push("조용하게 하루 시작");
    routine.day.push("혼자 집중 작업");
  } else {
    routine.morning.push("활기찬 시작");
    routine.day.push("사람들과 활동");
  }

  if (traits.SN === "N") {
    routine.day.push("창의적인 작업");
  } else {
    routine.day.push("실용적인 업무");
  }

  if (traits.TF === "F") {
    routine.evening.push("감성 활동");
  } else {
    routine.evening.push("자기계발");
  }

  if (traits.JP === "J") {
    routine.morning.push("계획 세우기");
    routine.night.push("다음날 준비");
  } else {
    routine.morning.push("자유롭게 시작");
    routine.night.push("즉흥 시간");
  }

  // 🔥 MBTI별 특화 추가
  const special = mbtiDescriptions[mbti];
  if (special) {
    routine.day.push(special[0]);
    routine.evening.push(special[1]);
    routine.night.push(special[2]);
  }

  // 🔥 스타일 보정
  if (style === "productive") {
    routine.day.push("핵심 목표 3개 달성");
  }

  if (style === "relaxed") {
    routine.evening.push("충분한 휴식");
  }

  // 출력
  resultDiv.innerHTML = `
    <h2>${mbti}의 하루 루틴</h2>

    <div class="time-block">
      <strong>🌅 아침</strong><br>
      ${routine.morning.join("<br>")}
    </div>

    <div class="time-block">
      <strong>☀️ 낮</strong><br>
      ${routine.day.join("<br>")}
    </div>

    <div class="time-block">
      <strong>🌆 저녁</strong><br>
      ${routine.evening.join("<br>")}
    </div>

    <div class="time-block">
      <strong>🌙 밤</strong><br>
      ${routine.night.join("<br>")}
    </div>
  `;

  resultDiv.classList.remove("hidden");
  localStorage.setItem("lastRoutine", resultDiv.innerHTML);
}

function saveRoutine() {
  const data = localStorage.getItem("lastRoutine");

  if (!data) {
    alert("먼저 루틴을 생성하세요!");
    return;
  }

  localStorage.setItem("savedRoutine", data);
  alert("루틴 저장 완료!");
}

window.onload = function() {
  const saved = localStorage.getItem("savedRoutine");

  if (saved) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = saved;
    resultDiv.classList.remove("hidden");
  }
};