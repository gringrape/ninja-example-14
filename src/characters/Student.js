import { Character } from './Character.js';

// 학생 클래스 (생존자 특화)
export class Student extends Character {
  constructor(scene, x, y, spriteKey = 'student') {
    super(scene, x, y, spriteKey);
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
    
    // 부모 클래스의 destroy 호출
    super.destroy();
    
    console.log('학생 객체가 정리되었습니다.');
  }
} 
