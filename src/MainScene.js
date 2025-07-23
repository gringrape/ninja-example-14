import { FacilityManager, FACILITY_TYPES } from './managers/FacilityManager.js';
import SurvivorManager from './managers/SurvivorManager.js';
import Survivor from './characters/Survivor.js';
import { MapManager } from './managers/MapManager.js';

const SCENE_BACKGROUND_COLOR = '#2c3e50';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    
    this.mapManager = new MapManager(this);
    this.facilityManager = new FacilityManager(this);
    this.survivorManager = new SurvivorManager(this);
  }

  preload() {
    this.cameras.main.setBackgroundColor(SCENE_BACKGROUND_COLOR);
    
    MapManager.loadAssets(this);
    FacilityManager.loadAssets(this);
    Survivor.loadAssets(this);
  }

  create() {
    this.initMap();
    this.initFacilities();
    this.startGame();
    
    // 애니메이션 생성
    Survivor.createAnimations(this);
    
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  initMap() {
    this.mapManager.renderMap();
  }

  // 좌표 변환을 MapManager로 위임
  toIsometric(x, y) {
    return this.mapManager.toIsometric(x, y);
  }
  
  startGame() {
    this.survivorManager.start();
  }
  
  initFacilities() {
    // 칠판 추가 (위쪽 벽 중앙에 배치, 위치 조정 필요할 수 있음)
    this.facilityManager.addBlackboard(0, 4);
    
    // 책상들을 격자 형태로 배치
    const rows = [2, 4, 6, 8]; // 행 위치들
    const cols = [2, 4, 6, 8]; // 열 위치들
    
    rows.forEach(row => {
      cols.forEach(col => {
        this.facilityManager.addFacility(col, row, FACILITY_TYPES.STUDENT_TABLE);
      });
    });
  }
  
  update() {
    this.survivorManager.handleInput(this.cursors);
  }
}
