import Character from './Character.js';

const SURVIVOR_ASSETS = [
  { key: 'survivor-front', path: 'assets/survivor-front.png' },
  { key: 'survivor-back', path: 'assets/survivor-back.png' },
  { key: 'survivor-left', path: 'assets/survivor-left.png' },
  { key: 'survivor-right', path: 'assets/survivor-right.png' }
];

export default class Survivor extends Character {
  constructor(scene, x, y, spriteKey = 'survivor') {
    super(scene, x, y, spriteKey);
    this.moveTimer = 0;
    this.moveDelay = 200; // 200ms마다 이동
  }
  
  static loadAssets(scene) {
    SURVIVOR_ASSETS.forEach(asset => {
      scene.load.image(asset.key, asset.path);
    });
  }
  
  update(cursors) {
    const direction = this.processInput(cursors);
    if (!direction) return;
    
    this.performMove(direction);
  }
  
  processInput(cursors) {
    const direction = this.getDirection(cursors);
    return (direction && this.canMove()) ? direction : null;
  }
  
  performMove(direction) {
    this.moveInDirection(direction);
    this.updateScreenPosition();
    this.updateSprite(direction);
    this.updateMoveTimer();
  }
  
  updateSprite(direction) {
    const directionMap = {
      down: 'left',
      up: 'right', 
      right: 'front',
      left: 'back'
    };
    const spriteDirection = directionMap[direction];
    const spriteKey = `${this.spriteKey}-${spriteDirection}`;
    this.sprite.setTexture(spriteKey);
  }
  
  updateMoveTimer() {
    this.moveTimer = Date.now();
  }
  
  getDirection(cursors) {
    if (cursors.left.isDown) return 'left';
    if (cursors.right.isDown) return 'right';
    if (cursors.up.isDown) return 'up';
    if (cursors.down.isDown) return 'down';
    return null;
  }
  
  canMove() {
    return Date.now() - this.moveTimer >= this.moveDelay;
  }
  
  moveInDirection(direction) {
    if (direction === 'left') this.gridX -= 1;
    else if (direction === 'right') this.gridX += 1;
    else if (direction === 'up') this.gridY -= 1;
    else if (direction === 'down') this.gridY += 1;
  }
  
  updateScreenPosition() {
    const isoPos = this.scene.toIsometric(this.gridX, this.gridY);
    this.sprite.setPosition(isoPos.x + this.scene.MAP_CENTER_X, isoPos.y + this.scene.MAP_CENTER_Y);
  }
} 
