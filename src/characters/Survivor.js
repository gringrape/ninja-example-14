import Character from './Character.js';

export default class Survivor extends Character {
  constructor(scene, x, y, spriteKey = 'survivor') {
    super(scene, x, y, spriteKey);
  }  
} 
