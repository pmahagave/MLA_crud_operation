import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-form.html',
  styleUrls: ['./student-form.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  isEditMode = false;
  studentId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentId = +id;
      this.loadStudentData();
    }
  }

  loadStudentData(): void {
    if (this.studentId) {
      this.loading = true;
      this.studentService.getStudent(this.studentId).subscribe({
        next: (data) => {
          this.studentForm.patchValue(data);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading student:', error);
          this.errorMessage = 'Failed to load student data';
          this.loading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.loading = true;
      const studentData = this.studentForm.value;

      if (this.isEditMode && this.studentId) {
        this.studentService.updateStudent(this.studentId, studentData).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error updating student:', error);
            this.errorMessage = 'Failed to update student';
            this.loading = false;
          }
        });
      } else {
        this.studentService.createStudent(studentData).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error creating student:', error);
            this.errorMessage = 'Failed to create student';
            this.loading = false;
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}