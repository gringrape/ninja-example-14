import { Facility } from './Facility.js';

// 시설 타입 정의
export const FACILITY_TYPES = {
  TABLE: 'table',
  CHAIR: 'chair'
};

// 시설 에셋 정보
export const FACILITY_ASSETS = {
  [FACILITY_TYPES.TABLE]: {
    key: 'table',
    path: 'assets/table.png'
  },
  [FACILITY_TYPES.CHAIR]: {
    key: 'chair', 
    path: 'assets/chair.png'
  }
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
  
  addFacility(x, y, type) {
    const facility = new Facility(this.scene, x, y, type);
    this.facilities.push(facility);
    return facility;
  }
  
  removeFacility(facility) {
    const index = this.facilities.indexOf(facility);
    if (index > -1) {
      this.facilities.splice(index, 1);
      facility.destroy();
    }
  }
  
  getFacilitiesAt(x, y) {
    return this.facilities.filter(facility => 
      facility.gridX === x && facility.gridY === y
    );
  }
  
  clearAll() {
    this.facilities.forEach(facility => facility.destroy());
    this.facilities = [];
  }
} 
