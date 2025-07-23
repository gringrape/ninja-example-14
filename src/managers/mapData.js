// 타일 색상 상수
const TILE_WALL_COLOR = 0x8B4513;
const TILE_FLOOR_COLOR = 0x90EE90;

export const tileTypes = {
  W: { name: '벽', color: TILE_WALL_COLOR, walkable: false, image: 'wall' },
  R: { name: '우측벽', color: TILE_WALL_COLOR, walkable: false, image: 'wall-right' },
  F: { name: '평지', color: TILE_FLOOR_COLOR, walkable: true, image: 'floor' },
  D: { name: '문', color: TILE_FLOOR_COLOR, walkable: true, image: 'door' }
};

export const mapData = [
  ['', 'R', 'R', 'D', 'R', 'R', 'R', 'R', 'R', 'R'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['W', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],  
]; 
