// Configurações iniciais do jogo
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;  // Tamanho do bloco
const canvasSize = canvas.width / box;  // Número de quadrados no canvas

let score = 0;  // Pontuação
let snake = [{x: 9 * box, y: 9 * box}];  // Corpo da cobra

let food = generateFood();  // Primeira comida
let direction = "right";  // Direção inicial

// Função para desenhar a cobrinha
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "green" : "lime";  // Cabeça é verde, corpo é limão
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Função para desenhar a comida
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Função para mover a cobra
function moveSnake() {
    let head = {...snake[0]};

    if (direction === "right") head.x += box;
    if (direction === "left") head.x -= box;
    if (direction === "up") head.y -= box;
    if (direction === "down") head.y += box;

    snake.unshift(head);
    
    // Verificar se a cobra comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }
}

// Função para gerar comida em uma posição aleatória
function generateFood() {
    let x = Math.floor(Math.random() * canvasSize) * box;
    let y = Math.floor(Math.random() * canvasSize) * box;
    return {x, y};
}

// Função para controlar o movimento da cobra
document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== "right") direction = "left";  // Esquerda
    if (event.keyCode === 38 && direction !== "down") direction = "up";   // Cima
    if (event.keyCode === 39 && direction !== "left") direction = "right"; // Direita
    if (event.keyCode === 40 && direction !== "up") direction = "down";   // Baixo
}

// Função para desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpar o canvas
    drawSnake();
    drawFood();
    moveSnake();

    // Verificar colisões com as bordas ou com a própria cobra
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height || collisionWithSelf()) {
        return clearInterval(gameInterval);
    }

    document.getElementById("score").textContent = "Pontuação: " + score;  // Atualizar a pontuação
}

// Verificar colisão com o próprio corpo da cobra
function collisionWithSelf() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Iniciar o jogo
const gameInterval = setInterval(draw, 100);  // Atualizar o jogo a cada 100ms
