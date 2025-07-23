export class Facility {
  constructor(scene, x, y, type, width = 64, height = 64) {
    this.scene = scene;
    this.gridX = x;
    this.gridY = y;
    this.type = type;
    this.width = width;
    this.height = height;
    this.sprite = null;
    
    this.createSprite();
  }
  
  createSprite() {
    const isoPos = this.scene.toIsometric(this.gridX, this.gridY);
    const screenX = isoPos.x + this.scene.MAP_CENTER_X;
    const screenY = isoPos.y + this.scene.MAP_CENTER_Y;
    
    this.sprite = this.scene.add.image(screenX, screenY, this.type);
    this.sprite.setDisplaySize(this.width, this.height);
    
    // 시설물이 타일보다 위에 나타나도록 depth 설정
    this.sprite.setDepth(100);
  }
  
  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
      this.sprite = null;
    }
    
    this.scene = null;
  }
}

 
