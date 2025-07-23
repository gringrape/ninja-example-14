import Character from './Character.js';

const SURVIVOR_ASSETS = [
  { key: 'survivor-front', path: 'assets/survivor-front.png' },
  { key: 'survivor-back', path: 'assets/survivor-back.png' },
  { key: 'survivor-left', path: 'assets/survivor-left.png' },
  { key: 'survivor-right', path: 'assets/survivor-right.png' },
  { key: 'survivor-walking-front', path: 'assets/survivor-front-walk.png' },
  { key: 'survivor-walking-back', path: 'assets/survivor-back-walk.png' },
  { key: 'survivor-walking-left', path: 'assets/survivor-left-walk.png' },
  { key: 'survivor-walking-right', path: 'assets/survivor-right-walk.png' }
];

export default class Survivor extends Character {
  constructor(scene, x, y, spriteKey = 'survivor') {
    super(scene, x, y, spriteKey);
    this.isMoving = false;
    this.isWalkingAnimationPlaying = false;
    this.moveSpeed = 400; // 300ms 이동 시간
    this.currentCursors = null;
  }
  
  createSprite() {
    // 그리드 좌표를 아이소메트릭 좌표로 변환
    const isoPos = this.scene.toIsometric(this.gridX, this.gridY);
    const screenX = isoPos.x + this.scene.MAP_CENTER_X;
    const screenY = isoPos.y + this.scene.MAP_CENTER_Y;
    
    // 애니메이션 가능한 스프라이트 생성
    this.sprite = this.scene.add.sprite(screenX, screenY, `${this.spriteKey}-front`);
    this.sprite.setDisplaySize(60, 60);
    
    // 학생이 항상 타일보다 위에 나타나도록 높은 depth 설정
    this.sprite.setDepth(1000);
  }
  
  static loadAssets(scene) {
    SURVIVOR_ASSETS.forEach(asset => {
      if (asset.key.includes('walking')) {
        scene.load.spritesheet(asset.key, asset.path, { frameWidth: 64, frameHeight: 64 });
      } else {
        scene.load.image(asset.key, asset.path);
      }
    });
  }
  
    static createAnimations(scene) {
    // 모든 방향의 걷기 애니메이션
    const directions = ['front', 'back', 'left', 'right'];
    
    directions.forEach(direction => {
      scene.anims.create({
        key: `survivor-walk-${direction}`,
        frames: scene.anims.generateFrameNumbers(`survivor-walking-${direction}`, { start: 0, end: 8 }),
        frameRate: 8,
        repeat: -1
      });
    });
  }
  
  update(cursors) {
    this.currentCursors = cursors;
    const direction = this.processInput(cursors);
    console.log('Direction:', direction, 'isMoving:', this.isMoving);
    if (!direction) return;
    
    console.log('Performing move:', direction);
    this.performMove(direction);
  }
  
  checkContinuousMovement() {
    if (this.currentCursors) {
      const direction = this.getDirection(this.currentCursors);
      if (direction && !this.isMoving) {
        console.log('Continuing movement:', direction);
        this.performMove(direction);
      }
    }
  }
  
  processInput(cursors) {
    const direction = this.getDirection(cursors);
    const hasInput = direction !== null;
    
    // 애니메이션 상태 업데이트 (이동 상태와 별개)
    if (hasInput && !this.isWalkingAnimationPlaying) {
      this.startWalkingAnimation(direction);
      this.isWalkingAnimationPlaying = true;
    } else if (!hasInput && this.isWalkingAnimationPlaying) {
      this.stopWalkingAnimation();
      this.isWalkingAnimationPlaying = false;
    }
    
    // 이동 중이 아닐 때만 새 이동 명령 허용
    return (direction && !this.isMoving) ? direction : null;
  }
  
  startWalkingAnimation(direction) {
    const directionMap = {
      down: 'left',
      up: 'right', 
      right: 'front',
      left: 'back'
    };
    
    const spriteDirection = directionMap[direction];
    const animationKey = `survivor-walk-${spriteDirection}`;
    this.sprite.play(animationKey);
  }
  
  stopWalkingAnimation() {
    this.sprite.stop();
    // 현재 애니메이션 방향에 맞는 정적 이미지로 복원
    this.restoreStaticSprite();
  }
  
  restoreStaticSprite() {
    // 현재 재생 중인 애니메이션 키를 기반으로 정적 이미지 설정
    const currentAnim = this.sprite.anims.currentAnim;
    if (currentAnim) {
      const animKey = currentAnim.key; // 예: 'survivor-walk-front'
      const direction = animKey.split('-').pop(); // 'front'
      this.sprite.setTexture(`${this.spriteKey}-${direction}`);
    }
  }
  

  
  performMove(direction) {
    // 이동 중인 상태로 설정
    this.isMoving = true;
    console.log('Starting move from:', this.gridX, this.gridY);
    
    // 새로운 그리드 위치 계산
    const newGridX = this.gridX + this.getDirectionOffset(direction).x;
    const newGridY = this.gridY + this.getDirectionOffset(direction).y;
    console.log('Moving to:', newGridX, newGridY);
    
    // 새로운 화면 위치 계산
    const newIsoPos = this.scene.toIsometric(newGridX, newGridY);
    const newScreenX = newIsoPos.x + this.scene.MAP_CENTER_X;
    const newScreenY = newIsoPos.y + this.scene.MAP_CENTER_Y;
    console.log('Screen position:', this.sprite.x, this.sprite.y, '->', newScreenX, newScreenY);
    
    // 스무스 이동 애니메이션
    this.scene.tweens.add({
      targets: this.sprite,
      x: newScreenX,
      y: newScreenY,
      duration: this.moveSpeed,
      ease: 'Power2.easeOut',
      onComplete: () => {
        // 그리드 위치 업데이트
        this.gridX = newGridX;
        this.gridY = newGridY;
        this.isMoving = false;
        console.log('Move completed to:', this.gridX, this.gridY);
        
        // 현재 키가 여전히 눌려있다면 다음 이동 시작
        this.checkContinuousMovement();
      }
    });
  }
  
  getDirectionOffset(direction) {
    const offsets = {
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 }
    };
    return offsets[direction] || { x: 0, y: 0 };
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
}
