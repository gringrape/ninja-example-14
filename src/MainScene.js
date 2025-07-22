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
    this.facilityManager.addFacility(5, 3, FACILITY_TYPES.TABLE);
    this.facilityManager.addFacility(6, 3, FACILITY_TYPES.CHAIR);
  }
  
  update() {
    this.survivorManager.handleInput(this.cursors);
  }
}
