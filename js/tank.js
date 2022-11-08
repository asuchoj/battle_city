function Tank(type, dx, dy, direction, lives) {
    this.type = type;
    this.x = dx;
    this.y = dy;
    this.direction = direction;
    this.lives = lives;

    if (type === MAP_LEGEND.PLAYER) {
        this.keyDown();
        this.keyUp();
    }
}

Tank.prototype = {
    moveTank(map) {
        const topCell = this.y - 1 >= 0 ? map[this.y - 1][this.x] : null;
        const downCell = this.y + 1 < CANVAS_HEIGHT_CELL_COUNT ? map[this.y + 1][this?.x] : null;
        const rightCell = this.x + 1 < CANVAS_WIDTH_CELL_COUNT ? map[this.y][this.x + 1] : null;
        const leftCell = this.x - 1 >= 0 ? map[this.y][this?.x - 1] : null;

        map[this.y][this.x].type = MAP_LEGEND.EMPTY;
        map[this.y][this.x].direction = DIRECTION.STOP;
        map[this.y][this.x].lives = this.lives;

        if (this.direction === DIRECTION.UP && (topCell?.type === MAP_LEGEND.EMPTY || topCell?.type === MAP_LEGEND.ENEMY_BASE)) {
            --this.y;
        } else if (this.direction === DIRECTION.DOWN && (downCell?.type === MAP_LEGEND.EMPTY || downCell?.type === MAP_LEGEND.ENEMY_BASE)) {
            ++this.y;
        } else if (this.direction === DIRECTION.LEFT && (leftCell?.type === MAP_LEGEND.EMPTY || leftCell?.type === MAP_LEGEND.ENEMY_BASE)) {
            --this.x;
        } else if (this.direction === DIRECTION.RIGHT && (rightCell?.type === MAP_LEGEND.EMPTY || rightCell?.type === MAP_LEGEND.ENEMY_BASE)) {
            ++this.x;
        } else if (this.type !== MAP_LEGEND.PLAYER) {
            this.direction = _randomIntFromInterval(DIRECTION.UP, DIRECTION.RIGHT);
        }

        const rowMap = map.findIndex((row, y) => y === this.y);
        const cellMap = map[rowMap].findIndex((cell, x) => x === this.x);

        map[rowMap][cellMap].type = this.type;
        map[rowMap][cellMap].direction = this.direction;
    },
    keyDown() {
        document.addEventListener('keydown', (target) => {
            if (PlayerTankMoveKeys[target.code]) {
                this.direction = _directionsTransformer(target.keyCode);
            }
        })
    },
    keyUp() {
        document.addEventListener('keyup', (target) => {
            if (PlayerTankMoveKeys[target.code]) {
                this.direction = DIRECTION.STOP;
            }
        })
    }
}


function Tanks() {
    this.tankCount = 0;
    this.tanks = [];
}

Tanks.prototype = {
    create (cell, type, x, y, direction) {
        this.tanks.push(_createTank(cell, type, x, y, direction, this.tankCount));
    },
    move(map) {
        this.tanks.forEach(tank => tank.moveTank(map));
    }
}

function _createTank(cell, type, x, y, direction, tankCount) {
    ++tankCount;
    const tankLiveCounts = type === MAP_LEGEND.ENEMY ? 1 : PLAYER_LIFE_COUNT;
    const tank = new Tank(type, x, y, direction, tankLiveCounts);
    cell.type = type;
    cell.direction = tank.direction;
    return tank;
}


function _randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function _directionsTransformer(code) {
    if (code === PlayerTankMoveKeys.ArrowUp) {
        return DIRECTION.UP;
    } else if (code === PlayerTankMoveKeys.ArrowDown) {
        return DIRECTION.DOWN;
    } else if (code === PlayerTankMoveKeys.ArrowLeft) {
        return DIRECTION.LEFT;
    } else if (code === PlayerTankMoveKeys.ArrowRight) {
        return DIRECTION.RIGHT;
    }
}
