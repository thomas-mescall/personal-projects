// Get the canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the ball position, size, and speed
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 10;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Set the paddle position, size, and speed
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 100;
let playerPaddleY = canvas.height / 2 - paddleHeight / 2;

// Set the colors of the sides of the square
let getRandomColor = Math.floor(Math.random()*16777215).toString(16);
let topColor = getRandomColor;
let bottomColor = getRandomColor;
let leftColor = getRandomColor;
let rightColor = getRandomColor;

// Add event listeners to move the paddle
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        playerPaddleY -= paddleSpeed;
    } else if (event.key === "ArrowDown") {
        playerPaddleY += paddleSpeed;
    }
});

// Game loop
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    // Draw the paddle
    ctx.beginPath();
    ctx.rect(
        canvas.width - paddleWidth,
        playerPaddleY,
        paddleWidth,
        paddleHeight
    );
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Bounce the ball off the walls
    if (ballY - ballRadius < 0) {
        ballSpeedY = -ballSpeedY;
        topColor = "purple";
    } else if (ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
        bottomColor = "orange";
    }

    if (ballX - ballRadius < 0) {
        ballSpeedX = -ballSpeedX;
        leftColor = "pink";
    } else if (ballX + ballRadius > canvas.width - paddleWidth &&
        ballY + ballRadius > playerPaddleY &&
        ballY - ballRadius < playerPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
        rightColor = "grey";
    }

    if (ballX + ballRadius > canvas.width) {
        // alert("Game over!");
        document.location.reload();
    }

    // Draw the square with the updated colors
    ctx.beginPath();
    ctx.fillStyle = topColor;
    ctx.fillRect(0, 0, canvas.width, ballRadius);
    ctx.fillStyle = bottomColor;
    ctx.fillRect(0, canvas.height - ballRadius, canvas.width, ballRadius);
    ctx.fillStyle = leftColor;
    ctx.fillRect(0, 0, ballRadius, canvas.height);
    ctx.fillStyle = rightColor;
    ctx.fillRect(canvas.width - ballRadius - paddleWidth, 0, ballRadius, canvas.height);
    ctx.closePath();

    // Request the next animation frame
    requestAnimationFrame(draw);
}

// Start the game loop
draw();
