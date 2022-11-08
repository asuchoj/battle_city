// 3 - опишите модель танка так, чтобы потом это можно было использовать для создания танков-противника и танка-игрока (тут мы намекаем, что неплохо было бы написать класс, который можно было бы легко потом использовать для создания танков любого типа)
// 4 - Создайте на карте танк-противник и научить его двигаться

// 5 - Теперь можно создать сразу трёх противников на трёх базах
// 6 - Создайте на карте танк игрока, и пускай он пока двигается по правилам танков-противников
// 7 - Самое время научить танк игрока реагировать на стрелки клавиатуры
// 8 - Научите танки сталкиваться со стенами и правильно реагировать на эти столкновения
// 8* - Научите теперь танки реагировать на столкновения с другими танками (это не обязательное и достаточно сложное задание, поэтому сделайте его, если у вас есть время)
// 9 - Научите танки стрелять
// 10 - Научите танки умирать от попадания в них снаряда
// 11 - Теперь можно сделать и разрушение стен
// 12 - Реализуйте появление нового танка-противника в случае, если один из них убит
// 13 - Реализуйте появление танка игрока на базе в случае, если он убит
// 14 - Организуйте счетчик жизней игрока
// 15 - Организуйте счетчик танков-противников
// 16 - Научите игру сообщать о победе или о поражении (например хотя бы с помощью alert()) и запускаться заново.

let IS_GAME_OVER = false;
const CANVAS_CELL_WIDTH_AND_HEIGHT = 64;
const CANVAS_WIDTH_CELL_COUNT = 13;
const CANVAS_HEIGHT_CELL_COUNT = 14;
const canvas = document.getElementById('game-map');
const context = canvas.getContext('2d');
const enemyTanks = new Tanks(MAP_LEGEND.ENEMY);
const playersTanks = new Tanks(MAP_LEGEND.PLAYER);
let changedMap;
let timeout;

gameInitialization();

function gameInitialization() {
    canvas.width = CANVAS_CELL_WIDTH_AND_HEIGHT * CANVAS_WIDTH_CELL_COUNT;
    canvas.height = CANVAS_CELL_WIDTH_AND_HEIGHT * CANVAS_HEIGHT_CELL_COUNT;
    changedMap = MAP.map((row) => row.map((cell) => new MapCell(cell, 1, 1)));
    renderMap();
    eventHandler();
}

function gameLoop() {
    if (IS_GAME_OVER !== true) {
        gameStep();
        timeout = setTimeout(() => gameLoop(), GAME_TIMER_INTERVAL);
    }
}

function gameStep() {
    /**
     * это то самое место, где стоит делать основные шаги игрового цикла
     * например, как нам кажется, можно было бы сделать следующее
     * 1. передвинуть пули
     * 2. рассчитать, где танки окажутся после этого шага
     * 3. проверить столкновения (пуль с танками, пуль со стенами, танков со стенами и танков с танками)
     * 4. убрать с поля мертвые танки и разрушенные стены
     * 5. проверить, не закончились ли жизни у игрока или не закончиличь ли танки противника
     * 6. создать новые танки на базах в случае, если кого-то убили на этом шаге
     */

    enemyTanks.move(changedMap);
    playersTanks.move(changedMap);
    renderMap();
}

function drawField(context, cell, url, x, y) {
    if (url) {
        const img = new Image();
        img.src = url;
        img.onload = () => draw(cell, img, x, y, CANVAS_CELL_WIDTH_AND_HEIGHT);
    } else {
        context.fillStyle = 'rgb(0,0,0)';
        context.fillRect(x, y, CANVAS_CELL_WIDTH_AND_HEIGHT, CANVAS_CELL_WIDTH_AND_HEIGHT);
    }
}

function renderMap() {
    changedMap.forEach((row, y) => {
        row.forEach((cell, x) => {
            const isRotate = MAP_LEGEND.ENEMY === cell.type;

            if (cell.isEnemyBase) {
                if (enemyTanks.tankCount < ENEMY_TANKS_COUNT && enemyTanks.tanks.length < MAX_ENEMY_TANKS_IN_CANVAS) {
                    enemyTanks.create(cell, MAP_LEGEND.ENEMY, x, y, changedMap, DIRECTION.DOWN);
                }
            }

            if(cell.isPlayerBase) {
                if (playersTanks.tanks.length < MAX_PLAYER_TANKS_IN_CANVAS) {
                    playersTanks.create(cell, MAP_LEGEND.PLAYER, x, y, DIRECTION.STOP)
                }
            }

            if (cell.type === 0 && cell.isEnemyBase) {
                cell.type = MAP_LEGEND.ENEMY_BASE;
            }

            if (cell.type === 0 && cell.isPlayerBase) {
                cell.type = MAP_LEGEND.PLAYER_BASE;
            }

            drawField(context, cell, GAME_BLOCKS_IMG_URL[cell.type], x * CANVAS_CELL_WIDTH_AND_HEIGHT, y * CANVAS_CELL_WIDTH_AND_HEIGHT, isRotate);
        })
    });
}

function eventHandler() {
    const stop = document.getElementById('stop_game');
    const run = document.getElementById('run_game');

    stop.addEventListener('click', () => {
        clearTimeout(timeout);

        run.classList.add('show');
        run.classList.remove('hide');
        stop.classList.remove('show');
        stop.classList.add('hide');
    })

    run.addEventListener('click', () => {
        if (!run.hasAttribute('disabled')) {
            gameLoop();
            run.classList.remove('show');
            run.classList.add('hide');
            stop.classList.remove('hide');
            stop.classList.add('show');
        }
    })
}

function draw(cell, img, x, y, canvasCellWidthAndHeight) {
    const a = x + canvasCellWidthAndHeight / 2;
    const b = y + canvasCellWidthAndHeight / 2;
    context.save();
    context.translate(a, b);
    rotate(cell);
    context.translate(-a, -b);
    context.drawImage(img, x, y, canvasCellWidthAndHeight, canvasCellWidthAndHeight);
    context.restore();
}

function rotate(cell) {
    if (DIRECTION.DOWN === cell.direction) {
        context.rotate(-Math.PI);
    } else if (DIRECTION.LEFT === cell.direction) {
        context.rotate(-Math.PI / 2);
    } else if (DIRECTION.RIGHT === cell.direction) {
        context.rotate(Math.PI / 2);
    }
}



