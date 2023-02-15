import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{

  courses$: Observable<Course[]>;
  displayedColumns = ['id', 'name', 'category'];

  constructor(
    private coursesServices: CoursesService
  ) {
    this.courses$ = this.coursesServices.list()
   }

  ngOnInit(): void { }

}