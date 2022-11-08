function MapCell(type, direction, lives) {
    this.type = type;
    this.direction = direction;
    this.lives = lives;
    this.isEnemyBase = type === MAP_LEGEND.ENEMY_BASE;
    this.isPlayerBase = type === MAP_LEGEND.PLAYER_BASE;
}
