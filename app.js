// ===== Storage Keys =====
const STORAGE_KEY = "devquiz_history";
const USED_KEY = "devquiz_used_ids";

// ===== State (immutable updates) =====
const createInitialState = (questions) => ({
  questions,
  currentIndex: 0,
  score: 0,
  answered: false,
});

let state = null;

// ===== Utility =====
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getUniqueCategories(questions) {
  return [...new Set(questions.map((q) => q.category))];
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hours = String(d.getHours()).padStart(2, "0");
  const mins = String(d.getMinutes()).padStart(2, "0");
  return `${month}/${day} ${hours}:${mins}`;
}

// ===== localStorage Helpers =====
function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function loadUsedIds() {
  try {
    const raw = localStorage.getItem(USED_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveUsedIds(usedSet) {
  localStorage.setItem(USED_KEY, JSON.stringify([...usedSet]));
}

// ===== Question Selection =====
function pickQuestions(count) {
  const usedIds = loadUsedIds();
  const unused = QUESTIONS.filter((q) => !usedIds.has(q.id));

  let selected;
  if (unused.length >= count) {
    selected = shuffle(unused).slice(0, count);
  } else {
    // 모든 문제를 풀었으면 초기화하고 다시 섞기
    saveUsedIds(new Set());
    selected = shuffle([...QUESTIONS]).slice(0, count);
  }

  return selected;
}

function markQuestionsUsed(questions) {
  const usedIds = loadUsedIds();
  const updatedIds = new Set([...usedIds, ...questions.map((q) => q.id)]);
  saveUsedIds(updatedIds);
}

// ===== Screen Management =====
function showScreen(screenId) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

// ===== Start Screen =====
function initStartScreen() {
  const categories = getUniqueCategories(QUESTIONS);
  const usedIds = loadUsedIds();
  const remaining = QUESTIONS.length - usedIds.size;

  document.getElementById("total-questions").textContent = QUESTIONS.length;
  document.getElementById("total-categories").textContent = categories.length;

  const tagsContainer = document.getElementById("category-tags");
  tagsContainer.innerHTML = categories
    .map((cat) => `<span class="category-tag">${cat}</span>`)
    .join("");

  updateHistoryButton();
  updateRemainingBadge(remaining);
}

function updateRemainingBadge(remaining) {
  const existing = document.getElementById("remaining-badge");
  if (existing) existing.remove();

  const badge = document.createElement("div");
  badge.id = "remaining-badge";
  badge.className = "remaining-badge";
  badge.textContent = remaining > 0
    ? `새 문제 ${remaining}개 남음`
    : "전체 문제 리셋! 다시 처음부터";
  const startBtn = document.querySelector(".start-btn");
  startBtn.parentNode.insertBefore(badge, startBtn);
}

function updateHistoryButton() {
  const history = loadHistory();
  const existing = document.getElementById("history-btn");
  if (existing) existing.remove();

  if (history.length > 0) {
    const btn = document.createElement("button");
    btn.id = "history-btn";
    btn.className = "history-btn";
    btn.textContent = `풀이 기록 (${history.length}회)`;
    btn.onclick = showHistory;
    const startBtn = document.querySelector(".start-btn");
    startBtn.parentNode.insertBefore(btn, startBtn.nextSibling);
  }
}

// ===== Quiz Logic =====
function startQuiz() {
  const selected = pickQuestions(20);
  state = createInitialState(selected);
  showScreen("quiz-screen");
  renderQuestion();
}

function renderQuestion() {
  const { questions, currentIndex, score } = state;
  const question = questions[currentIndex];
  const total = questions.length;

  document.getElementById("progress-text").textContent = `${currentIndex + 1} / ${total}`;
  document.getElementById("score-text").textContent = `${score}점`;
  document.getElementById("progress-fill").style.width = `${((currentIndex + 1) / total) * 100}%`;

  const labels = ["A", "B", "C", "D"];

  const quizBody = document.getElementById("quiz-body");
  quizBody.innerHTML = `
    <div class="fade-in">
      <span class="question-category">${question.category}</span>
      <h2 class="question-text">${question.question}</h2>
      <div class="options-list" id="options-list">
        ${question.options
          .map(
            (opt, i) => `
          <button class="option-btn" onclick="selectAnswer(${i})" data-index="${i}">
            <span class="option-label">${labels[i]}</span>
            <span>${opt}</span>
          </button>
        `,
          )
          .join("")}
      </div>
      <div id="feedback-area"></div>
    </div>
  `;
}

function selectAnswer(selectedIndex) {
  if (state.answered) return;

  const question = state.questions[state.currentIndex];
  const isCorrect = selectedIndex === question.answer;

  state = {
    ...state,
    answered: true,
    score: isCorrect ? state.score + 1 : state.score,
  };

  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, i) => {
    btn.classList.add("disabled");
    if (i === question.answer) {
      btn.classList.add("correct");
    }
    if (i === selectedIndex && !isCorrect) {
      btn.classList.add("wrong");
    }
  });

  const feedbackArea = document.getElementById("feedback-area");
  const resultClass = isCorrect ? "correct" : "wrong";
  const resultIcon = isCorrect ? "O" : "X";
  const resultText = isCorrect ? "정답입니다!" : "오답입니다";
  const isLast = state.currentIndex >= state.questions.length - 1;

  feedbackArea.innerHTML = `
    <div class="explanation-card ${resultClass}">
      <div class="explanation-result">
        <span>${resultIcon}</span>
        <span>${resultText}</span>
      </div>
      <p class="explanation-text">${question.explanation}</p>
    </div>
    <button class="next-btn" onclick="${isLast ? "showResult()" : "nextQuestion()"}">
      ${isLast ? "결과 보기" : "다음 문제"}
    </button>
  `;

  document.getElementById("score-text").textContent = `${state.score}점`;
}

function nextQuestion() {
  state = {
    ...state,
    currentIndex: state.currentIndex + 1,
    answered: false,
  };
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ===== Result Screen =====
function showResult() {
  const { score, questions } = state;
  const total = questions.length;
  const wrong = total - score;
  const percentage = Math.round((score / total) * 100);
  const deg = (percentage / 100) * 360;

  // 사용된 문제 ID 기록
  markQuestionsUsed(questions);

  // 히스토리 저장
  const record = {
    date: new Date().toISOString(),
    score,
    total,
    percentage,
    categories: [...new Set(questions.map((q) => q.category))],
  };
  const history = loadHistory();
  saveHistory([record, ...history]);

  let title, message;
  if (percentage >= 90) {
    title = "축하합니다!";
    message = "뛰어난 개발 지식을 가지고 계시네요. 시니어 개발자 수준입니다!";
  } else if (percentage >= 70) {
    title = "잘하셨어요!";
    message = "탄탄한 기본기를 갖추고 계시네요. 조금만 더 공부하면 완벽합니다!";
  } else if (percentage >= 50) {
    title = "괜찮아요!";
    message = "기본기는 있지만 부족한 부분이 있어요. 틀린 문제를 복습해보세요!";
  } else {
    title = "힘내세요!";
    message = "아직 배울 것이 많지만 걱정 마세요. 꾸준히 공부하면 금방 늘어요!";
  }

  const resultScreen = document.getElementById("result-screen");
  resultScreen.innerHTML = `
    <div class="fade-in" style="display:flex;flex-direction:column;align-items:center;gap:28px;">
      <div class="result-circle" style="--score-deg: ${deg}deg">
        <span class="result-score">${percentage}%</span>
        <span class="result-total">${score} / ${total}</span>
      </div>

      <h2 class="result-title">${title}</h2>
      <p class="result-message">${message}</p>

      <div class="result-details">
        <div class="result-detail correct-detail">
          <span class="result-detail-icon">O</span>
          <span class="result-detail-number">${score}</span>
          <span class="result-detail-label">정답</span>
        </div>
        <div class="result-detail wrong-detail">
          <span class="result-detail-icon">X</span>
          <span class="result-detail-number">${wrong}</span>
          <span class="result-detail-label">오답</span>
        </div>
      </div>

      <div class="result-buttons">
        <button class="retry-btn" onclick="startQuiz()">새 문제 풀기</button>
        <button class="home-btn" onclick="goHome()">홈으로</button>
      </div>
    </div>
  `;

  showScreen("result-screen");
}

// ===== History Screen =====
function showHistory() {
  const history = loadHistory();

  const resultScreen = document.getElementById("result-screen");
  resultScreen.innerHTML = `
    <div class="fade-in" style="display:flex;flex-direction:column;align-items:center;gap:20px;width:100%;">
      <h2 class="result-title">풀이 기록</h2>

      <div class="history-summary">
        <div class="history-summary-item">
          <span class="history-summary-number">${history.length}</span>
          <span class="history-summary-label">총 회차</span>
        </div>
        <div class="history-summary-item">
          <span class="history-summary-number">${history.length > 0 ? Math.round(history.reduce((sum, h) => sum + h.percentage, 0) / history.length) : 0}%</span>
          <span class="history-summary-label">평균 점수</span>
        </div>
        <div class="history-summary-item">
          <span class="history-summary-number">${history.length > 0 ? Math.max(...history.map((h) => h.percentage)) : 0}%</span>
          <span class="history-summary-label">최고 점수</span>
        </div>
      </div>

      <div class="history-list">
        ${history
          .map(
            (h, i) => `
          <div class="history-item">
            <div class="history-item-left">
              <span class="history-round">${history.length - i}회차</span>
              <span class="history-date">${formatDate(h.date)}</span>
            </div>
            <div class="history-item-right">
              <span class="history-score ${h.percentage >= 70 ? "high" : h.percentage >= 50 ? "mid" : "low"}">${h.percentage}%</span>
              <span class="history-detail">${h.score}/${h.total}</span>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>

      <div class="result-buttons" style="margin-top:8px;">
        <button class="retry-btn" onclick="startQuiz()">새 문제 풀기</button>
        <button class="home-btn" onclick="goHome()">홈으로</button>
        <button class="clear-btn" onclick="clearHistory()">기록 초기화</button>
      </div>
    </div>
  `;

  showScreen("result-screen");
}

function clearHistory() {
  if (confirm("모든 풀이 기록과 문제 진행 상태를 초기화할까요?")) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(USED_KEY);
    goHome();
  }
}

function goHome() {
  initStartScreen();
  showScreen("start-screen");
}

// ===== Init =====
initStartScreen();
