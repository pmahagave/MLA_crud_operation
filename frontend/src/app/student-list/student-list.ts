import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { StudentService, Student } from '../student.service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading students:', error);
        this.errorMessage = 'Failed to load students';
        this.loading = false;
      }
    });
  }

  editStudent(id: number): void {
    this.router.navigate(['/edit-student', id]);
  }

  deleteStudent(id: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => {
          this.loadStudents();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          this.errorMessage = 'Failed to delete student';
        }
      });
    }
  }

  addStudent(): void {
    this.router.navigate(['/add-student']);
  }
}