import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';



@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{

  courses$: Observable<Course[]> | null = null;
  displayedColumns = ['id', 'name', 'category', 'actions'];

  constructor(
    private coursesServices: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesServices.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos.')
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {

  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course.id], {relativeTo: this.route});
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja remover o curso " + course.name + "?",
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.coursesServices.remove(course.id).subscribe(() => {
          this.refresh();
          this.snackBar.open('Curso removido com sucesso!',
          'X',
          {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
        });
      }
    });
  }

}
