// 타일 색상 상수
const TILE_WALL_COLOR = 0x8B4513;
const TILE_FLOOR_COLOR = 0x90EE90;

export const tileTypes = {
  W: { name: '벽', color: TILE_WALL_COLOR, walkable: false, image: 'wall' },
  F: { name: '평지', color: TILE_FLOOR_COLOR, walkable: true, image: 'floor' }
};

export const mapData = [
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F'],
  ['F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F']
]; 
