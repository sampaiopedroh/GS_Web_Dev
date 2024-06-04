const quizContainer = document.getElementById('quiz-container');
const intro = document.getElementById('intro');
const quizArea = document.getElementById('quiz-area');
const resultArea = document.getElementById('result-area');
const startButton = document.getElementById('start-button');
const questionText = document.getElementById('question-text');
const optionsArea = document.getElementById('options-area');
const feedbackArea = document.getElementById('feedback-area');
const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const currentQuestion = document.getElementById('current-question');
const totalQuestions = document.getElementById('total-questions');
const finalScore = document.getElementById('final-score');
const feedbackMessage = document.getElementById('feedback-message');
const playAgainButton = document.getElementById('play-again-button');

let currentQuestionIndex = 0;
let score = 0;

// Banco de dados de perguntas (com duas questões adicionais)
const perguntas = [
    {
        pergunta: "Qual é o maior oceano do mundo?",
        alternativas: ["Atlântico", "Índico", "Pacífico", "Ártico"],
        respostaCorreta: "Pacífico"
    },
    {
        pergunta: "Qual é o animal marinho mais longo do mundo?",
        alternativas: ["Baleia Azul", "Tubarão Baleia", "Lula Gigante", "Polvo"],
        respostaCorreta: "Tubarão Baleia"
    },
    {
        pergunta: "Qual a maior ameaça aos oceanos atualmente?",
        alternativas: ["Poluição", "Aquecimento Global", "Pesca Excessiva", "Todas as alternativas"],
        respostaCorreta: "Todas as alternativas"
    },
    {
        pergunta: "Qual a importância dos recifes de coral para o ecossistema marinho?",
        alternativas: [
            "Abrigam diversas espécies marinhas.",
            "Protegem as costas da erosão.",
            "São importantes para a pesca.",
            "Todas as alternativas"
        ],
        respostaCorreta: "Todas as alternativas"
    },
    {
        pergunta: "O que é a 'Economia Azul'?",
        alternativas: [
            "Exploração de recursos minerais no fundo do mar.",
            "Utilização sustentável dos recursos marinhos.",
            "Construção de navios e embarcações.",
            "Turismo em áreas costeiras."
        ],
        respostaCorreta: "Utilização sustentável dos recursos marinhos."
    }
];

// Função para iniciar o quiz
function startQuiz() {
    intro.style.display = "none";
    quizArea.style.display = "block";
    showQuestion();
}

// Função para exibir a pergunta atual
function showQuestion() {
    feedbackArea.textContent = ''; // Limpa o feedback da pergunta anterior
    const questionData = perguntas[currentQuestionIndex];
    questionText.textContent = questionData.pergunta;
    optionsArea.innerHTML = ''; // Limpa as opções anteriores

    questionData.alternativas.forEach(alternativa => {
        const button = document.createElement('button');
        button.textContent = alternativa;
        button.addEventListener('click', () => checkAnswer(alternativa));
        optionsArea.appendChild(button);
    });

    currentQuestion.textContent = currentQuestionIndex + 1;
    totalQuestions.textContent = perguntas.length;
    updateNavigation();
}

// Função para verificar a resposta
function checkAnswer(selectedAnswer) {
    const questionData = perguntas[currentQuestionIndex];
    feedbackArea.textContent = '';

    if (selectedAnswer === questionData.respostaCorreta) {
        score++;
        feedbackArea.textContent = "Parabéns! Você acertou!";
        feedbackArea.style.color = "green";
    } else {
        feedbackArea.textContent = `Que pena, a resposta correta é ${questionData.respostaCorreta}.`;
        feedbackArea.style.color = "red";
    }

    // Desabilita todos os botões de resposta
    const optionsButtons = optionsArea.querySelectorAll('button');
    optionsButtons.forEach(button => {
        button.disabled = true;
    });

    // Avança para a próxima pergunta após um pequeno tempo (opcional)
    setTimeout(() => {
        nextQuestion();
    }, 1000); // Aguarda 1 segundo antes de avançar
}

// Função para atualizar a navegação (botões Anterior e Próximo)
function updateNavigation() {
    if (currentQuestionIndex === 0) {
        previousButton.disabled = true;
    } else {
        previousButton.disabled = false;
    }

    if (currentQuestionIndex === perguntas.length - 1) {
        nextButton.textContent = "Terminar";
    } else {
        nextButton.textContent = "Próximo";
    }
}

// Função para exibir a tela de resultado
function showResult() {
    quizArea.style.display = "none";
    resultArea.style.display = "block";
    finalScore.textContent = score;

    if (score >= perguntas.length / 2) {
        feedbackMessage.textContent = "Parabéns! Você é um especialista em oceanos!";
    } else {
        feedbackMessage.textContent = "Não se preocupe, continue aprendendo sobre o meio ambiente marinho!";
    }
}

// Função para voltar para a pergunta anterior
function previousQuestion() {
    currentQuestionIndex--;
    showQuestion();
}

// Função para ir para a próxima pergunta
function nextQuestion() {
    if (currentQuestionIndex < perguntas.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        showResult();
    }
}

// Função para reiniciar o quiz
function playAgain() {
    resultArea.style.display = "none";
    intro.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
}

// Event Listeners
startButton.addEventListener('click', startQuiz);
previousButton.addEventListener('click', previousQuestion);
nextButton.addEventListener('click', nextQuestion);
playAgainButton.addEventListener('click', playAgain);