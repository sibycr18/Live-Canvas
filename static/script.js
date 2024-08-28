const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const socket = io();

let drawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;

    const x = event.offsetX;
    const y = event.offsetY;
    const data = { x, y, lastX, lastY };

    socket.emit('draw', data);
    drawOnCanvas(data);

    lastX = x;
    lastY = y;
}

function drawOnCanvas(data) {
    ctx.beginPath();
    ctx.moveTo(data.lastX, data.lastY);
    ctx.lineTo(data.x, data.y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

socket.on('draw', (data) => {
    drawOnCanvas(data);
});

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});
