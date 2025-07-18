// 시설 클래스
export class Facility {
  constructor(scene, x, y, type) {
    this.scene = scene;
    this.gridX = x;
    this.gridY = y;
    this.type = type;
    this.sprite = null;
    
    this.createSprite();
  }
  
  createSprite() {
    // 그리드 좌표를 아이소메트릭 좌표로 변환
    const isoPos = this.scene.toIsometric(this.gridX, this.gridY);
    const screenX = isoPos.x + this.scene.MAP_CENTER_X;
    const screenY = isoPos.y + this.scene.MAP_CENTER_Y;
    
    // 스프라이트 생성
    this.sprite = this.scene.add.image(screenX, screenY, this.type);
    this.sprite.setDisplaySize(60, 60); // 타일 사이즈와 동일
  }
  
  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
      this.sprite = null;
    }
  }
}

 
