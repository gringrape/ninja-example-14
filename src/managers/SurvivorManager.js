import Survivor from '../characters/Survivor.js';

const SURVIVOR_ASSETS = [
  { key: 'survivor-front', path: 'assets/survivor-front.png' },
  { key: 'survivor-back', path: 'assets/survivor-back.png' },
  { key: 'survivor-left', path: 'assets/survivor-left.png' },
  { key: 'survivor-right', path: 'assets/survivor-right.png' }
];

export default class SurvivorManager {
  constructor(scene) {
    this.scene = scene;
    this.survivor = null;
  }

  static loadAssets(scene) {
    SURVIVOR_ASSETS.forEach(asset => {
      scene.load.image(asset.key, asset.path);
    });
  }

  start() {
    this.spawnSurvivor();
  }

  spawnSurvivor() {
    this.survivor = new Survivor(this.scene, 0, 0, 'survivor');
  }
} 
