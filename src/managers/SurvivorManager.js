import Survivor from '../characters/Survivor.js';

export default class SurvivorManager {
  constructor(scene) {
    this.scene = scene;
    this.survivor = null;
  }

  start() {
    this.spawnSurvivor();
  }

  spawnSurvivor() {
    this.survivor = new Survivor(this.scene, 0, 0, 'survivor');
  }

  handleInput(cursors) {
    if (this.survivor) {
      this.survivor.update(cursors);
    }
  }
} 
