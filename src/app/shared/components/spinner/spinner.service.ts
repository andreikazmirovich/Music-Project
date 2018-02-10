import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  taskCounter = 0;

  addTask(): void {
    this.taskCounter++;
  }

  removeTask(): void {
    if (this.taskCounter > 0) { this.taskCounter--; }
  }

  needSpinner(): boolean {
    return this.taskCounter > 0;
  }

}
