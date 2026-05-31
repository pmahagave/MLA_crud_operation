import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list';
import { StudentFormComponent } from './student-form/student-form';

export const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'add-student', component: StudentFormComponent },
  { path: 'edit-student/:id', component: StudentFormComponent }
];