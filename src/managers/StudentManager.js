import { Student } from '../characters/Student.js';

const STUDENT_ASSETS = [
  { key: 'student-front', path: 'assets/student-front.png' },
  { key: 'student-back', path: 'assets/student-back.png' },
  { key: 'student-left', path: 'assets/student-left.png' },
  { key: 'student-right', path: 'assets/student-right.png' }
];

export class StudentManager {
  constructor(scene) {
    this.scene = scene;
    this.student = null;
  }

  static loadAssets(scene) {
    STUDENT_ASSETS.forEach(asset => {
      scene.load.image(asset.key, asset.path);
    });
  }

  startStudentSimulation() {
    this.spawnStudent();
  }

  spawnStudent() {
    if (this.student) return;

    this.student = new Student(this.scene, 0, 0, 'student');

    this.runStudentLifeCycle();
  }

  async runStudentLifeCycle() {
    await this.student.walkToPosition(6, 0);
    await this.student.walkToPosition(6, 3);
    await this.student.changeDirection('back');

    await this.student.startEating();

    await this.student.walkToPosition(6, 8);

    this.student.destroy();
    this.student = null;
  }
} 
