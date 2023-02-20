import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';




@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    name: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]],
    category: ['', [Validators.required]]
  });

  constructor(
    private coursesService: CoursesService,
    private formBuilder: NonNullableFormBuilder,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      id: course.id,
      name: course.name,
      category: course.category
    })


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
    'X',
      {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
    this.location.back();
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso',
    'X',
      {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if(field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if(field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 100;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }

    return 'Campo Inválido';
  }

}
