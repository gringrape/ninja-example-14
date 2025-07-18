import { tileTypes, mapData } from './mapData.js';
import { FacilityManager, FACILITY_TYPES } from './FacilityManager.js';

// 맵 중앙 좌표
const MAP_CENTER_X = 400;
const MAP_CENTER_Y = 200;

// 타일 크기
const TILE_SIZE = 60;
const ISO_TILE_HALF_WIDTH = TILE_SIZE / 2;
const ISO_TILE_HALF_HEIGHT = TILE_SIZE / 4;

// 타일 테두리 상수
const SCENE_BACKGROUND_COLOR = '#2c3e50';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    this.facilityManager = null;
    this.MAP_CENTER_X = MAP_CENTER_X;
    this.MAP_CENTER_Y = MAP_CENTER_Y;
  }

  preload() {
    this.cameras.main.setBackgroundColor(SCENE_BACKGROUND_COLOR);
    
    this.load.image('floor', 'assets/floor.png');
    
    FacilityManager.loadAssets(this);
  }

  create() {
    this.renderMap();
    this.initFacilities();
  }
  
  initFacilities() {
    this.facilityManager = new FacilityManager(this);
    
    // 테이블 배치 (몇 개 예시)
    this.facilityManager.addFacility(2, 2, FACILITY_TYPES.TABLE);
    this.facilityManager.addFacility(5, 3, FACILITY_TYPES.TABLE);
    this.facilityManager.addFacility(7, 6, FACILITY_TYPES.TABLE);
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
    
    const tile = this.add.image(x, y, imageKey);
    tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
  }
}
