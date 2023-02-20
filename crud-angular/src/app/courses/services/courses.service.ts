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
      delay(0),
      tap(courses => console.log(courses))
    );
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  save(course: Partial<Course>) {
    if(course.id) {
      return this.update(course);
    }
    return this.create(course);
  }

  private create(course: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, course)
    .pipe(
      first()
    );
  }

  private update(course: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${course.id}`, course)
    .pipe(
      first()
    );
  }

  remove(id: string) {
    return this.httpClient.delete<Course>(`${this.API}/${id}`)
    .pipe(
      first()
    );
  }
}
