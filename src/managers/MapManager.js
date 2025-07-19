import { tileTypes, mapData } from './mapData.js';

// 맵 관련 상수
const MAP_CENTER_X = 400;
const MAP_CENTER_Y = 200;
const TILE_SIZE = 60;
const ISO_TILE_HALF_WIDTH = TILE_SIZE / 2;
const ISO_TILE_HALF_HEIGHT = TILE_SIZE / 4;

// 맵 에셋 정보
const MAP_ASSETS = [
  { key: 'floor', path: 'assets/floor.png' }
];

// 맵 관리자 클래스
export class MapManager {
  constructor(scene) {
    this.scene = scene;
    
    // 맵 중앙 좌표를 scene에서 접근할 수 있도록 설정
    this.scene.MAP_CENTER_X = MAP_CENTER_X;
    this.scene.MAP_CENTER_Y = MAP_CENTER_Y;
  }

  // 맵 에셋 로딩 (static 메서드)
  static loadAssets(scene) {
    MAP_ASSETS.forEach(asset => {
      scene.load.image(asset.key, asset.path);
    });
  }

  renderMap() {
    mapData.forEach((rowData, row) => {
      rowData.forEach((tileKey, col) => {
        this.drawTile(col, row, tileKey);
      });
    });
  }

  drawTile(col, row, tileKey) {
    const { x, y } = this.toIsometric(col, row);
    const screenX = x + MAP_CENTER_X;
    const screenY = y + MAP_CENTER_Y;
    this.renderTile(screenX, screenY, tileKey);
  }
  
  toIsometric(x, y) {
    const isoX = (x - y) * ISO_TILE_HALF_WIDTH;
    const isoY = (x + y) * ISO_TILE_HALF_HEIGHT;
    return { x: isoX, y: isoY };
  }

  renderTile(x, y, tileKey) {
    const tileType = tileTypes[tileKey];
    const imageKey = tileType ? tileType.image : 'floor';
    
    const tile = this.scene.add.image(x, y, imageKey);
    tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
  }
} 
