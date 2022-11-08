const MAP = [
    [2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0],
    [3, 0, 3, 3, 0, 3, 3, 3, 0, 3, 3, 0, 3],
    [0, 0, 0, 3, 0, 3, 0, 3, 0, 3, 0, 0, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0],
    [0, 3, 0, 3, 0, 0, 0, 0, 0, 3, 0, 3, 0],
    [0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0]
];
const GAME_TIMER_INTERVAL = 1000;

const PLAYER_LIFE_COUNT = 3;

const ENEMY_TANKS_COUNT = 21;

const MAX_ENEMY_TANKS_IN_CANVAS = 6;

const MAX_PLAYER_TANKS_IN_CANVAS = 1;

const MAP_LEGEND = {
    EMPTY: 0,
    PLAYER_BASE: 1,
    ENEMY_BASE: 2,
    WALL: 3,
    ENEMY: 4,
    PLAYER: 5
}

const DIRECTION = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    STOP: 5
}

const GAME_BLOCKS_IMG_URL = {
    [MAP_LEGEND.PLAYER]: './img/player-tank.png',
    [MAP_LEGEND.WALL]: './img/wall.png',
    [MAP_LEGEND.ENEMY]: './img/enemy-tank.png',
}

const PlayerTankMoveKeys = {
    ArrowLeft: 37,
    ArrowUp: 38,
    ArrowRight: 39,
    ArrowDown: 40,
}