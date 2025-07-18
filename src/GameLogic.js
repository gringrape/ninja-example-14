import { Student } from './Student.js';

export class GameLogic {
  constructor(scene) {
    this.scene = scene;
    this.student = null; // 학생 한명만 관리
  }
  
  startStudentSimulation() {
    // 학생 한명 등장
    this.spawnStudent();
  }
  
  spawnStudent() {
    if (this.student) return; // 이미 학생이 있으면 생성하지 않음
    
    this.student = new Student(this.scene, 0, 0);
    
    // 학생 라이프사이클 실행
    this.runStudentLifeCycle();
  }
  
  async runStudentLifeCycle() {
    console.log('학생이 등장했습니다.');
    
    // 테이블로 이동
    await this.student.walkToPosition(6, 0);
    await this.student.walkToPosition(6, 3);
    await this.student.changeDirection('back');
    
    console.log('학생이 식사를 시작합니다.');
    await this.student.startEating();
    
    console.log('학생이 식사를 완료했습니다.');
    
    // 퇴장
    await this.student.walkToPosition(6, 8);
    
    // 학생 객체 정리
    this.student.destroy();
    this.student = null;
    
    console.log('학생이 퇴장했습니다.');
  }
} 
