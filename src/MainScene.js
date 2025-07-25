import { FacilityManager, FACILITY_TYPES } from './managers/FacilityManager.js';
import SurvivorManager from './managers/SurvivorManager.js';
import Survivor from './characters/Survivor.js';
import { MapManager } from './managers/MapManager.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    
    this.mapManager = new MapManager(this);
    this.facilityManager = new FacilityManager(this);
    this.survivorManager = new SurvivorManager(this);
  }

  preload() {
    this.load.image('background', 'assets/background.jpeg');
    
    MapManager.loadAssets(this);
    FacilityManager.loadAssets(this);
    Survivor.loadAssets(this);
  }

  create() {
    this.initBackground();
    this.initOverlay();
    this.initMap();
    this.initFacilities();
    this.startGame();
    
    // 애니메이션 생성
    Survivor.createAnimations(this);
    
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  initBackground() {
    // 배경 이미지 생성
    this.background = this.add.image(0, 0, 'background');
    
    // 화면 전체를 채우도록 크기 조정
    const scaleX = this.cameras.main.width / this.background.width;
    const scaleY = this.cameras.main.height / this.background.height;
    const scale = Math.max(scaleX, scaleY);
    this.background.setScale(scale);
    
    // 화면 중앙에 배치
    this.background.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
    this.background.setScrollFactor(0);
    this.background.setDepth(-1);
  }

  initOverlay() {
    // 반투명 검은 오버레이 추가
    this.overlay = this.add.rectangle(
      this.cameras.main.centerX, 
      this.cameras.main.centerY,
      this.cameras.main.width, 
      this.cameras.main.height, 
      0x000000
    );
    
    this.overlay.setAlpha(0.85);
    this.overlay.setScrollFactor(0);
    this.overlay.setDepth(0);
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
