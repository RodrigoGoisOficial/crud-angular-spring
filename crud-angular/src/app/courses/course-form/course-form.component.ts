import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from './../services/courses.service';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      id: '',
      name: [null],
      category: [null]
    });
  }

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
