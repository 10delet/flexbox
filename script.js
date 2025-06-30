let currentQuestionIndex = 0
let score = 0
let timer
let timeLeft = 30
let questionsAnswered = 0
let currentSubject = ""
let currentQuestions = []
let currentLevel = 1
let lives = 3
let streak = 0
let multiplier = 1
let levelProgress = 0
const questionsPerLevel = 5 
const maxLevel = 10 

const questionElement = document.getElementById("question")
const answersContainer = document.getElementById("answers-container")
const scoreElement = document.getElementById("score")
const questionNumberElement = document.getElementById("question-number")
const feedbackElement = document.getElementById("feedback")
const nextButton = document.getElementById("next-btn")
const gameOverModal = document.getElementById("game-over-modal")
const levelUpModal = document.getElementById("level-up-modal")
const finalScoreElement = document.getElementById("final-score")
const restartButton = document.getElementById("restart-btn")
const shareButton = document.getElementById("share-btn")
const timeElement = document.getElementById("time")
const livesElement = document.getElementById("lives")
const streakElement = document.getElementById("streak")
const multiplierElement = document.getElementById("multiplier")
const currentLevelElement = document.getElementById("current-level")
const levelDescriptionElement = document.getElementById("level-description")
const levelProgressBar = document.getElementById("level-progress-bar")
const levelProgressText = document.getElementById("level-progress-text")
const levelProgressMaxElement = document.getElementById("level-progress-max")
const totalQuestionsElement = document.getElementById("total-questions")
const continueBtn = document.getElementById("continue-btn")

const achievements = {
  firstWin: { name: "Primeira Vitória", description: "Acerte sua primeira pergunta", icon: "🎯", unlocked: false },
  streak5: { name: "Sequência de 5", description: "Acerte 5 perguntas seguidas", icon: "🔥", unlocked: false },
  streak10: { name: "Sequência de 10", description: "Acerte 10 perguntas seguidas", icon: "⚡", unlocked: false },
  level5: { name: "Nível 5", description: "Alcance o nível 5", icon: "⭐", unlocked: false },
  level10: { name: "Nível 10", description: "Alcance o nível 10", icon: "🌟", unlocked: false },
  perfectRound: { name: "Rodada Perfeita", description: "Complete um nível sem errar", icon: "💎", unlocked: false },
  speedDemon: {
    name: "Demônio da Velocidade",
    description: "Responda em menos de 5 segundos",
    icon: "💨",
    unlocked: false,
  },
  scholar: { name: "Erudito", description: "Alcance 1000 pontos", icon: "🎓", unlocked: false },
  master: { name: "Mestre", description: "Alcance 5000 pontos", icon: "👑", unlocked: false },
}

const levelDescriptions = {
  1: "Iniciante",
  2: "Novato",
  3: "Aprendiz",
  4: "Estudante",
  5: "Intermediário",
  6: "Avançado",
  7: "Experiente",
  8: "Especialista",
  9: "Mestre",
  10: "Lendário",
}

const questionDatabase = {
  math: {
    1: [
      { question: "Quanto é 5 + 3?", answers: ["6", "8", "9", "7"], correct: 1 },
      { question: "Quanto é 10 - 4?", answers: ["5", "6", "7", "8"], correct: 1 },
      { question: "Quanto é 2 × 3?", answers: ["5", "6", "7", "8"], correct: 1 },
      { question: "Quanto é 12 ÷ 4?", answers: ["2", "3", "4", "5"], correct: 1 },
      { question: "Qual número vem depois de 9?", answers: ["8", "10", "11", "12"], correct: 1 },
    ],
    2: [
      { question: "Quanto é 15 + 27?", answers: ["32", "42", "37", "45"], correct: 1 },
      { question: "Quanto é 8 × 7?", answers: ["48", "56", "64", "72"], correct: 1 },
      { question: "Quanto é 144 ÷ 12?", answers: ["10", "12", "14", "16"], correct: 1 },
      { question: "Qual é 25% de 100?", answers: ["20", "25", "30", "35"], correct: 1 },
      { question: "Quanto é 3² (3 ao quadrado)?", answers: ["6", "9", "12", "15"], correct: 1 },
    ],
    3: [
      {
        question: "Se um triângulo tem ângulos de 30° e 60°, qual é o terceiro ângulo?",
        answers: ["60°", "90°", "120°", "180°"],
        correct: 1,
      },
      { question: "Qual é a raiz quadrada de 144?", answers: ["10", "12", "14", "16"], correct: 1 },
      { question: "Quanto é 3/4 de 100?", answers: ["25", "50", "75", "100"], correct: 2 },
      { question: "Se x + 5 = 12, qual é o valor de x?", answers: ["5", "6", "7", "8"], correct: 2 },
      {
        question: "Qual é a área de um quadrado com lado de 5 cm?",
        answers: ["10 cm²", "20 cm²", "25 cm²", "30 cm²"],
        correct: 2,
      },
    ],
    4: [
      {
        question: "Qual é o próximo número na sequência: 2, 4, 8, 16, ___?",
        answers: ["20", "24", "32", "64"],
        correct: 2,
      },
      { question: "Quanto é 150 ÷ 0.5?", answers: ["75", "150", "300", "450"], correct: 2 },
      { question: "Qual é o resultado de 5² + 12²?", answers: ["169", "144", "194", "289"], correct: 0 },
      { question: "Se 2x - 3 = 7, qual é o valor de x?", answers: ["3", "4", "5", "6"], correct: 2 },
      {
        question: "Qual é o perímetro de um retângulo com lados 8 e 6?",
        answers: ["24", "28", "32", "48"],
        correct: 1,
      },
    ],
    5: [
      { question: "Qual é a derivada de x²?", answers: ["x", "2x", "x²", "2x²"], correct: 1 },
      { question: "Quanto é log₁₀(1000)?", answers: ["2", "3", "4", "10"], correct: 1 },
      { question: "Qual é o valor de sen(90°)?", answers: ["0", "1", "0.5", "-1"], correct: 1 },
      { question: "Quantas faces tem um cubo?", answers: ["4", "6", "8", "12"], correct: 1 },
      { question: "Qual é a fórmula da área do círculo?", answers: ["πr", "2πr", "πr²", "2πr²"], correct: 2 },
    ],
  },
  science: {
    1: [
      { question: "Quantas pernas tem uma aranha?", answers: ["6", "8", "10", "12"], correct: 1 },
      { question: "Qual é a cor do sol?", answers: ["Azul", "Amarelo", "Verde", "Vermelho"], correct: 1 },
      { question: "Onde vivem os peixes?", answers: ["Terra", "Água", "Ar", "Fogo"], correct: 1 },
      { question: "Quantos olhos temos?", answers: ["1", "2", "3", "4"], correct: 1 },
      {
        question: "O que as plantas precisam para crescer?",
        answers: ["Só água", "Só luz", "Água e luz", "Só terra"],
        correct: 2,
      },
    ],
    2: [
      {
        question: "Qual é o maior planeta do nosso sistema solar?",
        answers: ["Marte", "Júpiter", "Vênus", "Saturno"],
        correct: 1,
      },
      {
        question: "Qual gás as plantas absorvem da atmosfera?",
        answers: ["Oxigênio", "Nitrogênio", "Dióxido de Carbono", "Hidrogênio"],
        correct: 2,
      },
      { question: "Quantos ossos tem o corpo humano adulto?", answers: ["106", "206", "306", "406"], correct: 1 },
      {
        question: "Qual é o animal mais rápido do mundo?",
        answers: ["Leopardo", "Guepardo", "Leão", "Tigre"],
        correct: 1,
      },
      { question: "Qual planeta é mais próximo do Sol?", answers: ["Vênus", "Terra", "Mercúrio", "Marte"], correct: 2 },
    ],
    3: [
      { question: "Qual é a fórmula química da água?", answers: ["CO2", "O2", "H2O", "NaCl"], correct: 2 },
      {
        question: "Qual é o processo pelo qual as plantas produzem seu próprio alimento?",
        answers: ["Respiração", "Transpiração", "Fotossíntese", "Germinação"],
        correct: 2,
      },
      {
        question: "Qual é o metal mais abundante na crosta terrestre?",
        answers: ["Ferro", "Cobre", "Alumínio", "Ouro"],
        correct: 2,
      },
      { question: "Qual é a unidade básica da vida?", answers: ["Átomo", "Molécula", "Célula", "Tecido"], correct: 2 },
      {
        question: "Qual planeta é conhecido como o 'Planeta Vermelho'?",
        answers: ["Júpiter", "Marte", "Vênus", "Mercúrio"],
        correct: 1,
      },
    ],
    4: [
      {
        question: "Qual é o nome da galáxia em que vivemos?",
        answers: ["Andrômeda", "Triângulo", "Via Láctea", "Cigarro"],
        correct: 2,
      },
      {
        question: "Qual é o ponto de ebulição da água em graus Celsius?",
        answers: ["0°C", "50°C", "100°C", "200°C"],
        correct: 2,
      },
      {
        question: "Qual cientista formulou a Teoria da Relatividade?",
        answers: ["Isaac Newton", "Albert Einstein", "Galileu Galilei", "Stephen Hawking"],
        correct: 1,
      },
      {
        question: "Qual é o elemento químico mais abundante no universo?",
        answers: ["Oxigênio", "Hidrogênio", "Carbono", "Hélio"],
        correct: 1,
      },
      { question: "Quantos cromossomos tem uma célula humana normal?", answers: ["23", "46", "48", "50"], correct: 1 },
    ],
    5: [
      {
        question: "Qual é a velocidade da luz no vácuo?",
        answers: ["300.000 km/s", "150.000 km/s", "450.000 km/s", "600.000 km/s"],
        correct: 0,
      },
      {
        question: "Qual partícula subatômica tem carga negativa?",
        answers: ["Próton", "Nêutron", "Elétron", "Pósitron"],
        correct: 2,
      },
      {
        question: "Qual é a constante de Avogadro (aproximadamente)?",
        answers: ["6,02 × 10²³", "3,14 × 10²³", "9,81 × 10²³", "1,60 × 10²³"],
        correct: 0,
      },
      {
        question: "Qual é o nome do processo de divisão celular que produz gametas?",
        answers: ["Mitose", "Meiose", "Citocinese", "Interfase"],
        correct: 1,
      },
      {
        question: "Qual é a fórmula da energia cinética?",
        answers: ["E = mc²", "E = ½mv²", "E = mgh", "E = hf"],
        correct: 1,
      },
    ],
  },
  geography: {
    1: [
      {
        question: "Qual é a capital do Brasil?",
        answers: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
        correct: 2,
      },
      { question: "Quantos continentes existem?", answers: ["5", "6", "7", "8"], correct: 2 },
      {
        question: "Qual é o maior país do mundo?",
        answers: ["China", "Estados Unidos", "Rússia", "Brasil"],
        correct: 2,
      },
      {
        question: "Em que continente fica o Brasil?",
        answers: ["África", "América do Sul", "Ásia", "Europa"],
        correct: 1,
      },
      { question: "Qual é o menor país do mundo?", answers: ["Mônaco", "Vaticano", "Nauru", "San Marino"], correct: 1 },
    ],
    2: [
      {
        question: "Qual é o maior oceano do mundo?",
        answers: ["Atlântico", "Índico", "Pacífico", "Ártico"],
        correct: 2,
      },
      {
        question: "Qual é o rio mais longo do mundo?",
        answers: ["Amazonas", "Nilo", "Yangtzé", "Mississippi"],
        correct: 1,
      },
      {
        question: "Qual país é conhecido como a 'Terra do Sol Nascente'?",
        answers: ["China", "Coreia do Sul", "Japão", "Tailândia"],
        correct: 2,
      },
      { question: "Qual é a capital da França?", answers: ["Londres", "Paris", "Roma", "Madrid"], correct: 1 },
      { question: "Qual é a moeda do Reino Unido?", answers: ["Euro", "Libra", "Dólar", "Franco"], correct: 1 },
    ],
    3: [
      {
        question: "Qual é o deserto mais quente do mundo?",
        answers: ["Saara", "Atacama", "Gobi", "Kalahari"],
        correct: 0,
      },
      {
        question: "Qual é a montanha mais alta do mundo?",
        answers: ["K2", "Monte Everest", "Kangchenjunga", "Lhotse"],
        correct: 1,
      },
      {
        question: "Qual continente é o maior em área terrestre?",
        answers: ["África", "América do Norte", "Ásia", "Europa"],
        correct: 2,
      },
      {
        question: "Qual é o nome do canal que liga o Oceano Atlântico ao Oceano Pacífico?",
        answers: ["Canal de Suez", "Canal da Mancha", "Canal do Panamá", "Estreito de Bering"],
        correct: 2,
      },
      { question: "Qual é a capital da Austrália?", answers: ["Sydney", "Melbourne", "Canberra", "Perth"], correct: 2 },
    ],
    4: [
      {
        question: "Qual é o maior lago de água doce do mundo em volume?",
        answers: ["Lago Superior", "Lago Vitória", "Lago Baikal", "Lago Michigan"],
        correct: 2,
      },
      {
        question: "Qual país tem mais fusos horários?",
        answers: ["Rússia", "Estados Unidos", "China", "França"],
        correct: 3,
      },
      {
        question: "Qual é a linha imaginária que divide a Terra em hemisférios norte e sul?",
        answers: ["Trópico de Câncer", "Trópico de Capricórnio", "Equador", "Meridiano de Greenwich"],
        correct: 2,
      },
      { question: "Qual é a capital do Canadá?", answers: ["Toronto", "Vancouver", "Montreal", "Ottawa"], correct: 3 },
      {
        question: "Qual país é conhecido como 'Terra dos Mil Lagos'?",
        answers: ["Suécia", "Finlândia", "Noruega", "Dinamarca"],
        correct: 1,
      },
    ],
    5: [
      {
        question: "Qual é a profundidade máxima da Fossa das Marianas?",
        answers: ["8.848 m", "10.994 m", "11.034 m", "12.262 m"],
        correct: 2,
      },
      {
        question: "Qual país tem a maior reserva de petróleo do mundo?",
        answers: ["Arábia Saudita", "Venezuela", "Irã", "Iraque"],
        correct: 1,
      },
      {
        question: "Qual é a capital de Burkina Faso?",
        answers: ["Ouagadougou", "Bamako", "Niamey", "N'Djamena"],
        correct: 0,
      },
      {
        question: "Qual arquipélago pertence ao Equador?",
        answers: ["Açores", "Canárias", "Galápagos", "Maldivas"],
        correct: 2,
      },
      {
        question: "Qual é o ponto mais baixo da Terra?",
        answers: ["Vale da Morte", "Mar Morto", "Depressão de Qattara", "Lago Assal"],
        correct: 1,
      },
    ],
  },
}

document.addEventListener("DOMContentLoaded", () => {
  loadProgress()
  updateProgressDisplay()
  renderAchievements()
  setTimeout(animateProgressBars, 500)
})

function saveProgress() {
  const progress = {
    achievements: achievements,
    bestScore: Number.parseInt(document.getElementById("best-score").textContent),
    maxLevel: Number.parseInt(document.getElementById("max-level").textContent),
    subjectLevels: {
      math: Number.parseInt(document.getElementById("math-level").textContent),
      science: Number.parseInt(document.getElementById("science-level").textContent),
      geography: Number.parseInt(document.getElementById("geography-level").textContent),
    },
  }
  localStorage.setItem("quizProgress", JSON.stringify(progress))
}

function loadProgress() {
  const saved = localStorage.getItem("quizProgress")
  if (saved) {
    const progress = JSON.parse(saved)
    Object.assign(achievements, progress.achievements)
    document.getElementById("best-score").textContent = progress.bestScore || 0
    document.getElementById("max-level").textContent = progress.maxLevel || 1

    if (progress.subjectLevels) {
      document.getElementById("math-level").textContent = progress.subjectLevels.math || 1
      document.getElementById("science-level").textContent = progress.subjectLevels.science || 1
      document.getElementById("geography-level").textContent = progress.subjectLevels.geography || 1
    }
  }
}

function updateProgressDisplay() {
  const subjects = ["math", "science", "geography"]
  subjects.forEach((subject) => {
    const level = Number.parseInt(document.getElementById(`${subject}-level`).textContent)
    const progress = Math.min(((level - 1) / (maxLevel - 1)) * 100, 100)
    document.getElementById(`${subject}-progress`).style.width = `${progress}%`

    const progressBar = document.getElementById(`${subject}-progress`)
    if (level >= 8) {
      progressBar.className = `bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500`
    } else if (level >= 5) {
      progressBar.className = `bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500`
    } else {
      const colors = {
        math: "bg-orange-500",
        science: "bg-green-500",
        geography: "bg-blue-500",
      }
      progressBar.className = `${colors[subject]} h-2 rounded-full transition-all duration-500`
    }
  })
}

function selectSubject(subject) {
  currentSubject = subject
  currentLevel = Number.parseInt(document.getElementById(`${subject}-level`).textContent)

  const quizHeader = document.getElementById("quiz-header")
  const quizIcon = document.getElementById("quiz-icon")
  const quizSubject = document.getElementById("quiz-subject")

  const themes = {
    math: {
      gradient: "bg-gradient-to-r from-orange-500 to-red-600",
      icon: "fas fa-calculator",
      title: "Desafio Matemático!",
    },
    science: {
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
      icon: "fas fa-flask",
      title: "Desafio de Ciências!",
    },
    geography: {
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
      icon: "fas fa-globe",
      title: "Desafio de Geografia!",
    },
  }

  const theme = themes[subject]
  quizHeader.className = `${theme.gradient} text-white py-6 shadow-lg`
  quizIcon.className = `${theme.icon} mr-3`
  quizSubject.textContent = theme.title

  document.getElementById("subject-selection").classList.add("hidden")
  document.getElementById("quiz-game").classList.remove("hidden")

  initGame()
}

function backToSubjects() {
  clearInterval(timer)
  document.getElementById("quiz-game").classList.add("hidden")
  document.getElementById("subject-selection").classList.remove("hidden")
  gameOverModal.classList.add("hidden")
  levelUpModal.classList.add("hidden")
}

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function initGame() {
  currentQuestionIndex = 0
  score = 0
  questionsAnswered = 0
  lives = 3
  streak = 0
  multiplier = 1
  levelProgress = 0

  const levelQuestions = questionDatabase[currentSubject][currentLevel] || questionDatabase[currentSubject][1]
  currentQuestions = shuffleArray(levelQuestions).slice(0, questionsPerLevel)

  updateGameUI()
  loadQuestion()

  updateQuizFooter()
}

function updateGameUI() {
  scoreElement.textContent = score
  livesElement.textContent = lives
  streakElement.textContent = streak
  multiplierElement.textContent = multiplier
  currentLevelElement.textContent = currentLevel
  levelDescriptionElement.textContent = levelDescriptions[currentLevel] || "Desconhecido"
  totalQuestionsElement.textContent = questionsPerLevel
  levelProgressText.textContent = currentQuestionIndex
  levelProgressMaxElement.textContent = questionsPerLevel

  const progressPercent = (currentQuestionIndex / questionsPerLevel) * 100
  levelProgressBar.style.width = `${progressPercent}%`

  updateQuizFooter()
}

function loadQuestion() {
  if (currentQuestionIndex >= questionsPerLevel) {
    checkLevelUp()
    return
  }

  clearInterval(timer)
  timeLeft = Math.max(15, 30 - currentLevel * 2) 
  timeElement.textContent = timeLeft
  startTimer()

  const currentQuestion = currentQuestions[currentQuestionIndex]
  questionElement.textContent = currentQuestion.question
  questionNumberElement.textContent = currentQuestionIndex + 1

  answersContainer.innerHTML = ""
  feedbackElement.classList.add("hidden")
  nextButton.classList.add("hidden")

  currentQuestion.answers.forEach((answer, index) => {
    const answerButton = document.createElement("button")
    answerButton.className =
      "answer-btn bg-white hover:bg-orange-200 text-orange-900 font-semibold py-4 px-4 rounded-xl border-2 border-orange-300 transition-all duration-300 shadow-md"
    answerButton.textContent = answer
    answerButton.style.animationDelay = `${index * 0.1}s`
    answerButton.classList.add("slide-in")
    answerButton.addEventListener("click", () => selectAnswer(index))
    answersContainer.appendChild(answerButton)
  })
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--
    timeElement.textContent = timeLeft

    if (timeLeft <= 5) {
      timeElement.parentElement.classList.add("animate-pulse")
    }

    if (timeLeft <= 0) {
      clearInterval(timer)
      timeUp()
    }
  }, 1000)
}

function timeUp() {
  timeElement.parentElement.classList.remove("animate-pulse")
  feedbackElement.textContent = "⏰ Tempo esgotado!"
  feedbackElement.className = "text-red-600 shake-animation"
  feedbackElement.classList.remove("hidden")

  const answerButtons = document.querySelectorAll(".answer-btn")
  answerButtons.forEach((button) => {
    button.disabled = true
    button.classList.add("opacity-50")
  })

  const correctIndex = currentQuestions[currentQuestionIndex].correct
  answerButtons[correctIndex].classList.add("bg-green-200", "border-green-500")

  loseLife()
  streak = 0
  multiplier = 1
  updateGameUI()

  setTimeout(() => nextQuestion(), 2000)
}

function selectAnswer(answerIndex) {
  clearInterval(timer)
  timeElement.parentElement.classList.remove("animate-pulse")

  const correctIndex = currentQuestions[currentQuestionIndex].correct
  const answerButtons = document.querySelectorAll(".answer-btn")
  const responseTime = 30 - timeLeft

  answerButtons.forEach((button) => {
    button.disabled = true
    button.classList.add("opacity-50")
  })

  if (answerIndex === correctIndex) {
    answerButtons[answerIndex].classList.add("bg-green-200", "border-green-500", "correct-answer")

    let points = 10 * currentLevel * multiplier
    if (responseTime <= 5) {
      points *= 2 
      checkAchievement("speedDemon")
    }

    score += points
    streak++
    levelProgress += 10

    multiplier = Math.min(Math.floor(streak / 3) + 1, 5)

    const messages = ["🎉 Correto!", "✨ Excelente!", "🔥 Perfeito!", "⭐ Incrível!", "💎 Fantástico!"]
    feedbackElement.textContent = messages[Math.floor(Math.random() * messages.length)]
    feedbackElement.className = "text-green-600 bounce-animation"

    checkAchievement("firstWin")
    if (streak === 5) checkAchievement("streak5")
    if (streak === 10) checkAchievement("streak10")
    if (score >= 1000) checkAchievement("scholar")
    if (score >= 5000) checkAchievement("master")

    createCelebrationParticles()
    if (streak > 2) showComboText(`${streak}x COMBO!`)
  } else {
    answerButtons[answerIndex].classList.add("bg-red-200", "border-red-500", "wrong-answer")
    answerButtons[correctIndex].classList.add("bg-green-200", "border-green-500")

    feedbackElement.textContent = `❌ Incorreto! A resposta correta é: ${currentQuestions[currentQuestionIndex].answers[correctIndex]}`
    feedbackElement.className = "text-red-600 shake-animation"

    loseLife()
    streak = 0
    multiplier = 1
  }

  feedbackElement.classList.remove("hidden")
  questionsAnswered++
  updateGameUI()

  setTimeout(() => nextQuestion(), 2500)
}

function loseLife() {
  lives--
  if (lives <= 0) {
    setTimeout(() => endGame(), 1000)
  }
}

function nextQuestion() {
  currentQuestionIndex++
  loadQuestion()
}

function checkLevelUp() {
  if (lives > 0 && currentLevel < maxLevel) {
    currentLevel++

    if (currentLevel === 5) checkAchievement("level5")
    if (currentLevel === 10) checkAchievement("level10")

    const subjectLevelElement = document.getElementById(`${currentSubject}-level`)
    subjectLevelElement.textContent = currentLevel
    updateProgressDisplay()

    showLevelUpModal()
  } else {
    endGame()
  }
}

function showLevelUpModal() {
  document.getElementById("new-level").textContent = currentLevel
  document.getElementById("new-level-description").textContent = levelDescriptions[currentLevel] || "Desconhecido"
  levelUpModal.classList.remove("hidden")

  createCelebrationParticles()
  playLevelUpAnimation()
}

function continueToNextLevel() {
  levelUpModal.classList.add("hidden")

  const levelQuestions = questionDatabase[currentSubject][currentLevel]
  if (levelQuestions && currentLevel <= maxLevel) {
    currentQuestions = shuffleArray(levelQuestions).slice(0, questionsPerLevel)
    currentQuestionIndex = 0
    questionsAnswered = 0
    lives = Math.min(lives + 1, 5) 
    updateGameUI()
    loadQuestion()
  } else {
    endGame()
  }
}

function endGame() {
  const bestScore = Number.parseInt(document.getElementById("best-score").textContent)
  const maxLevel = Number.parseInt(document.getElementById("max-level").textContent)

  if (score > bestScore) {
    document.getElementById("best-score").textContent = score
  }

  if (currentLevel > maxLevel) {
    document.getElementById("max-level").textContent = currentLevel
  }

  const subjectLevelElement = document.getElementById(`${currentSubject}-level`)
  const currentSubjectLevel = Number.parseInt(subjectLevelElement.textContent)
  if (currentLevel > currentSubjectLevel) {
    subjectLevelElement.textContent = currentLevel
  }

  saveProgress()
  updateProgressDisplay()

  document.getElementById("final-score").textContent = score
  document.getElementById("final-level").textContent = currentLevel
  document.getElementById("final-streak").textContent = streak

  const newAchievements = checkNewAchievements()
  if (newAchievements.length > 0) {
    document.getElementById("new-achievements").classList.remove("hidden")
    document.getElementById("new-achievements-list").innerHTML = newAchievements
      .map((a) => `${a.icon} ${a.name}`)
      .join("<br>")
  }

  if (lives <= 0) {
    document.getElementById("game-over-icon").textContent = "😔"
    document.getElementById("game-over-title").textContent = "Game Over!"
  } else {
    document.getElementById("game-over-icon").textContent = "🎉"
    document.getElementById("game-over-title").textContent = "Parabéns!"
  }

  gameOverModal.classList.remove("hidden")
  renderAchievements()
}

function checkAchievement(achievementId) {
  if (!achievements[achievementId].unlocked) {
    achievements[achievementId].unlocked = true
    showAchievementNotification(achievements[achievementId])
  }
}

function checkNewAchievements() {
  const newAchievements = []
  Object.keys(achievements).forEach((key) => {
    if (achievements[key].unlocked && !achievements[key].notified) {
      newAchievements.push(achievements[key])
      achievements[key].notified = true
    }
  })
  return newAchievements
}

function showAchievementNotification(achievement) {
  const notification = document.createElement("div")
  notification.className =
    "fixed top-4 right-4 bg-yellow-400 text-yellow-900 px-6 py-3 rounded-lg shadow-lg z-50 bounce-animation"
  notification.innerHTML = `
        <div class="flex items-center">
            <span class="text-2xl mr-3">${achievement.icon}</span>
            <div>
                <div class="font-bold">${achievement.name}</div>
                <div class="text-sm">${achievement.description}</div>
            </div>
        </div>
    `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 4000)
}

function renderAchievements() {
  const achievementsContainer = document.getElementById("achievements")
  achievementsContainer.innerHTML = ""

  Object.keys(achievements).forEach((key) => {
    const achievement = achievements[key]
    const achievementElement = document.createElement("div")
    achievementElement.className = `achievement-badge p-3 rounded-lg text-center cursor-pointer transition-all ${
      achievement.unlocked
        ? "bg-yellow-100 border-2 border-yellow-400 unlocked"
        : "bg-gray-100 border-2 border-gray-300 locked"
    }`

    achievementElement.innerHTML = `
            <div class="text-2xl mb-1">${achievement.icon}</div>
            <div class="text-xs font-bold ${achievement.unlocked ? "text-yellow-700" : "text-gray-500"}">${achievement.name}</div>
        `

    achievementElement.title = achievement.description
    achievementsContainer.appendChild(achievementElement)
  })
}

function createCelebrationParticles() {
  const colors = ["#f59e0b", "#10b981", "#3b82f6", "#ef4444", "#8b5cf6"]
  const particlesContainer = document.getElementById("celebration-particles")
  particlesContainer.classList.remove("hidden")

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 2 + "s"

    particlesContainer.appendChild(particle)

    setTimeout(() => {
      particle.remove()
    }, 3000)
  }

  setTimeout(() => {
    particlesContainer.classList.add("hidden")
  }, 3000)
}

function showComboText(text) {
  const comboElement = document.createElement("div")
  comboElement.className = "combo-text"
  comboElement.textContent = text

  document.body.appendChild(comboElement)

  setTimeout(() => {
    comboElement.remove()
  }, 1000)
}

function playLevelUpAnimation() {
  const modal = levelUpModal.querySelector("div")
  modal.classList.add("level-up-animation")

  setTimeout(() => {
    modal.classList.remove("level-up-animation")
  }, 800)
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++
  loadQuestion()
})

restartButton.addEventListener("click", () => {
  gameOverModal.classList.add("hidden")
  initGame()
})

continueBtn.addEventListener("click", continueToNextLevel)

shareButton.addEventListener("click", () => {
  const subjectNames = {
    math: "Matemática",
    science: "Ciências",
    geography: "Geografia",
  }

  const shareText = `🎓 Acabei de marcar ${score} pontos no Quiz de ${subjectNames[currentSubject]} e alcancei o nível ${currentLevel}! 🚀\n\nTente bater minha pontuação no Quiz Educativo Avançado!`

  if (navigator.share) {
    navigator
      .share({
        title: "Quiz Educativo Avançado",
        text: shareText,
        url: window.location.href,
      })
      .catch((err) => {
        console.log("Erro ao compartilhar:", err)
        fallbackShare(shareText)
      })
  } else {
    fallbackShare(shareText)
  }
})

function fallbackShare(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text + "\n" + window.location.href).then(() => {
      alert("📋 Texto copiado para a área de transferência!")
    })
  } else {
    alert("📱 Compartilhe sua pontuação:\n\n" + text + "\n\n" + window.location.href)
  }
}

document.addEventListener("keydown", (e) => {
  if (document.getElementById("quiz-game").classList.contains("hidden")) return

  if (e.key >= "1" && e.key <= "4") {
    const answerButtons = document.querySelectorAll(".answer-btn:not([disabled])")
    const index = Number.parseInt(e.key) - 1
    if (answerButtons[index]) {
      answerButtons[index].click()
    }
  }

  if (e.key === "Enter" && !nextButton.classList.contains("hidden")) {
    nextButton.click()
  }

  if (e.key === "Escape") {
    backToSubjects()
  }
})

window.addEventListener("resize", () => {
  if (window.innerWidth < 768) {
    document.querySelectorAll(".answer-btn").forEach((btn) => {
      btn.classList.add("text-sm", "py-3")
    })
  } else {
    document.querySelectorAll(".answer-btn").forEach((btn) => {
      btn.classList.remove("text-sm", "py-3")
    })
  }
})

if (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
  document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
      e.preventDefault()
      return false
    }
  })

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    return false
  })
}

function updateQuizFooter() {
  const footerLevel = document.getElementById("footer-current-level")
  const footerSubject = document.getElementById("footer-current-subject")

  if (footerLevel) footerLevel.textContent = currentLevel
  if (footerSubject) {
    const subjectNames = {
      math: "Matemática",
      science: "Ciências",
      geography: "Geografia",
    }
    footerSubject.textContent = subjectNames[currentSubject] || "Matéria"
  }
}

function animateProgressBars() {
  const subjects = ["math", "science", "geography"]
  subjects.forEach((subject, index) => {
    setTimeout(() => {
      const progressBar = document.getElementById(`${subject}-progress`)
      progressBar.style.transform = "scaleX(0)"
      progressBar.style.transformOrigin = "left"

      setTimeout(() => {
        progressBar.style.transform = "scaleX(1)"
        progressBar.style.transition = "transform 1s ease-out"
      }, 100)
    }, index * 200)
  })
}

console.log("🎓 Quiz Educativo Avançado carregado com sucesso!")
console.log("📚 Matérias disponíveis:", Object.keys(questionDatabase))
console.log("🏆 Sistema de conquistas ativo")
