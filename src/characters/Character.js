export default class Character {
  constructor(scene, x, y, spriteKey) {
    this.scene = scene;
    this.gridX = x;
    this.gridY = y;
    this.spriteKey = spriteKey;
    this.sprite = null;
    
    this.createSprite();
  }
  
  createSprite() {
    // 그리드 좌표를 아이소메트릭 좌표로 변환
    const isoPos = this.scene.toIsometric(this.gridX, this.gridY);
    const screenX = isoPos.x + this.scene.MAP_CENTER_X;
    const screenY = isoPos.y + this.scene.MAP_CENTER_Y;
    
    // 캐릭터 스프라이트 생성 (기본은 앞쪽)
    this.sprite = this.scene.add.image(screenX, screenY, `${this.spriteKey}-front`);
    this.sprite.setDisplaySize(60, 60);
  }
  
  walkToPosition(targetX, targetY) {
    return new Promise((resolve) => {
      // 이동 방향에 따른 에셋 변경
      this.updateDirection(targetX, targetY);
      
      // 목표 위치의 스크린 좌표 계산
      const targetIsoPos = this.scene.toIsometric(targetX, targetY);
      const targetScreenX = targetIsoPos.x + this.scene.MAP_CENTER_X;
      const targetScreenY = targetIsoPos.y + this.scene.MAP_CENTER_Y;
      
      // 걸어서 이동하는 애니메이션
      this.scene.tweens.add({
        targets: this.sprite,
        x: targetScreenX,
        y: targetScreenY,
        duration: 2000, // 2초 동안 이동
        ease: 'Linear',
        onComplete: () => {
          // 이동 완료 후 캐릭터의 그리드 위치 업데이트
          this.gridX = targetX;
          this.gridY = targetY;
          
          // Promise 완료
          resolve();
        }
      });
    });
  }
  
  updateDirection(targetX, targetY) {
    const deltaX = targetX - this.gridX;
    const deltaY = targetY - this.gridY;
    
    // 이동 방향에 따른 에셋 변경
    if (deltaX > 0) {
      this.sprite.setTexture(`${this.spriteKey}-front`); // 아래쪽
    } else if (deltaX < 0) {
      this.sprite.setTexture(`${this.spriteKey}-back`); // 위쪽
    } else if (deltaY > 0) {
      this.sprite.setTexture(`${this.spriteKey}-left`); // 왼쪽
    } else if (deltaY < 0) {
      this.sprite.setTexture(`${this.spriteKey}-right`); // 오른쪽
    }
  }
  
  changeDirection(direction) {
    return new Promise((resolve) => {
      // 지정된 방향으로 에셋 변경
      this.sprite.setTexture(`${this.spriteKey}-${direction}`);
      resolve();
    });
  }
  
  destroy() {
    // 스프라이트 정리
    if (this.sprite) {
      this.sprite.destroy();
      this.sprite = null;
    }
    
    // 참조 정리
    this.scene = null;
  }
} 
