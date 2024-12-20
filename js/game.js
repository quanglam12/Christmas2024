// Khởi tạo canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Thiết lập kích thước canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Nhân vật
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height / 2 - 20,
    width: 40,
    height: 40,
    color: "blue",
    speed: 5,
};

// Quà
const gifts = [];
for (let i = 0; i < 5; i++) {
    gifts.push({
        x: Math.random() * (canvas.width - 30),
        y: Math.random() * (canvas.height - 30),
        width: 30,
        height: 30,
        color: "green",
    });
}

// Phím điều khiển
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
};
// Lắng nghe phím
window.addEventListener("keydown", (e) => {
    if (e.key in keys) keys[e.key] = true;
});
window.addEventListener("keyup", (e) => {
    if (e.key in keys) keys[e.key] = false;
});

// Cập nhật vị trí nhân vật
function updatePlayer() {
    if (keys.ArrowUp && player.y > 0) player.y -= player.speed;
    if (keys.ArrowDown && player.y + player.height < canvas.height) player.y += player.speed;
    if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
    if (keys.ArrowRight && player.x + player.width < canvas.width) player.x += player.speed;
}
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawGifts() {
    gifts.forEach((gift) => {
        ctx.fillStyle = gift.color;
        ctx.fillRect(gift.x, gift.y, gift.width, gift.height);
    });
}
function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function handleCollisions() {
    gifts.forEach((gift, index) => {
        if (checkCollision(player, gift)) {
            gifts.splice(index, 1); // Xóa quà khi nhân vật chạm
        }
    });
}
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Xóa màn hình
    updatePlayer(); // Cập nhật trạng thái nhân vật
    handleCollisions(); // Kiểm tra va chạm
    drawPlayer(); // Vẽ nhân vật
    drawGifts(); // Vẽ quà
    requestAnimationFrame(gameLoop); // Lặp lại trò chơi
}

gameLoop(); // Bắt đầu trò chơi
document.getElementById("up").addEventListener("mousedown", () => (keys.ArrowUp = true));
document.getElementById("up").addEventListener("mouseup", () => (keys.ArrowUp = false));
document.getElementById("left").addEventListener("mousedown", () => (keys.ArrowLeft = true));
document.getElementById("left").addEventListener("mouseup", () => (keys.ArrowLeft = false));
document.getElementById("down").addEventListener("mousedown", () => (keys.ArrowDown = true));
document.getElementById("down").addEventListener("mouseup", () => (keys.ArrowDown = false));
document.getElementById("right").addEventListener("mousedown", () => (keys.ArrowRight = true));
document.getElementById("right").addEventListener("mouseup", () => (keys.ArrowRight = false));
