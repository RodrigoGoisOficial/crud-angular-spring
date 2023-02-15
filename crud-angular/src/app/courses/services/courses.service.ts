import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Course } from '../model/course';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'http://localhost:3000/courses'

  constructor(
    private httpClient: HttpClient
  ) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(1000),
      tap(courses => console.log(courses))
    );
  }

  save(course: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, course)
    .pipe(
      first()
    );
  }
}
