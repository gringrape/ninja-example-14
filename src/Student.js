// 학생 클래스
export class Student {
  constructor(scene, x, y) {
    this.scene = scene;
    this.gridX = x;
    this.gridY = y;
    this.sprite = null;
    
    this.createSprite();
  }
  
  createSprite() {
    // 그리드 좌표를 아이소메트릭 좌표로 변환
    const isoPos = this.scene.toIsometric(this.gridX, this.gridY);
    const screenX = isoPos.x + this.scene.MAP_CENTER_X;
    const screenY = isoPos.y + this.scene.MAP_CENTER_Y;
    
    // 학생 스프라이트 생성 (기본은 앞쪽)
    this.sprite = this.scene.add.image(screenX, screenY, 'student-front');
    this.sprite.setDisplaySize(60, 60);
  }
  
  moveTo(gridX, gridY) {
    this.gridX = gridX;
    this.gridY = gridY;
    
    // 새로운 위치로 스프라이트 이동
    const isoPos = this.scene.toIsometric(this.gridX, this.gridY);
    const screenX = isoPos.x + this.scene.MAP_CENTER_X;
    const screenY = isoPos.y + this.scene.MAP_CENTER_Y;
    
    this.sprite.setPosition(screenX, screenY);
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
          // 이동 완료 후 학생의 그리드 위치 업데이트
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
      this.sprite.setTexture('student-front'); // 아래쪽
    } else if (deltaX < 0) {
      this.sprite.setTexture('student-back'); // 위쪽
    } else if (deltaY > 0) {
      this.sprite.setTexture('student-left'); // 왼쪽
    } else if (deltaY < 0) {
      this.sprite.setTexture('student-right'); // 오른쪽
    }
  }
  
  changeDirection(direction) {
    return new Promise((resolve) => {
      // 지정된 방향으로 에셋 변경
      this.sprite.setTexture(`student-${direction}`);
      resolve();
    });
  }
  
  startEating() {
    return new Promise((resolve) => {
      console.log('학생이 식사를 시작합니다.');
      
      // 게이지 UI 생성
      this.createEatingGauge();
      
      // 4초 후 완료
      setTimeout(() => {
        this.destroyEatingGauge();
        console.log('식사 완료!');
        resolve();
      }, 4000);
    });
  }
  
  createEatingGauge() {
    // 게이지 배경
    this.gaugeBackground = this.scene.add.rectangle(400, 50, 200, 20, 0x000000);
    this.gaugeBackground.setStrokeStyle(2, 0xffffff);
    
    // 게이지 바
    this.gaugeBar = this.scene.add.rectangle(400, 50, 200, 20, 0x00ff00);
    
    // 게이지 감소 애니메이션
    this.scene.tweens.add({
      targets: this.gaugeBar,
      scaleX: 0,
      duration: 4000,
      ease: 'Linear'
    });
  }
  
  destroyEatingGauge() {
    if (this.gaugeBackground) {
      this.gaugeBackground.destroy();
      this.gaugeBackground = null;
    }
    if (this.gaugeBar) {
      this.gaugeBar.destroy();
      this.gaugeBar = null;
    }
  }
  
  destroy() {
    // 게이지 정리
    this.destroyEatingGauge();
    
    // 스프라이트 정리
    if (this.sprite) {
      this.sprite.destroy();
      this.sprite = null;
    }
    
    // 참조 정리
    this.scene = null;
    console.log('학생 객체가 정리되었습니다.');
  }
} 
