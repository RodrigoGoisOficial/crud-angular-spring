import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../services/courses.service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  constructor(
    private coursesService: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.coursesService.save(this.form.value)
    .subscribe(result => this.onSuccess(), error => this.onError());
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!',
    '',
    {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "bottom"
    });
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso',
    '',
    {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "bottom"
    });
  }

}
