import { Facility } from '../Facility.js';

// 시설 타입 정의
export const FACILITY_TYPES = {
  BLACKBOARD: 'blackboard',
  STUDENT_TABLE: 'student-table'
};

// 시설 에셋 정보
export const FACILITY_ASSETS = {
  [FACILITY_TYPES.BLACKBOARD]: { key: 'blackboard', path: 'assets/blackboard.png' },
  [FACILITY_TYPES.STUDENT_TABLE]: { key: 'student-table', path: 'assets/student-table.png' }
};

// 시설 관리자 클래스
export class FacilityManager {
  constructor(scene) {
    this.scene = scene;
    this.facilities = [];
  }
  
  // 시설 에셋 로딩 (static 메서드)
  static loadAssets(scene) {
    Object.values(FACILITY_ASSETS).forEach(asset => {
      scene.load.image(asset.key, asset.path);
    });
  }
  
  addFacility(x, y, type, width = 64, height = 64) {
    const facility = new Facility(this.scene, x, y, type, width, height);
    this.facilities.push(facility);
    return facility;
  }
  
  // 칠판 추가 전용 메서드
  addBlackboard(x, y) {
    return this.addFacility(x, y, FACILITY_TYPES.BLACKBOARD, 100, 75);
  }
} 
