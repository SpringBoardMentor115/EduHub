import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ToastModule,
    ButtonModule,
  ],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  providers: [MessageService],
})
export class CoursesComponent implements OnInit {
  categories: any[] = [];
  courses: any[] = [];
  courseContent: any[] = [];
  filteredCategories: any[] = [];
  searchTerm: string = '';
  selectedCourseId: number = 0;
  showEnrollment: boolean = false;
  selectedcategory: any;
  coursecatelog: boolean = false;

  constructor(
    private http: HttpClient,
    public authService: AuthenticationService,
    public router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  toggleEnrollment(): void {
    this.showEnrollment = !this.showEnrollment;
  }

  enrollCourse(courseId: number): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available for course enrollment');
      return;
    }
    const enrollmentDate = new Date().toISOString().split('T')[0];
    const apiUrl = 'http://localhost:8080/api/enroll';
    const requestBody = {
      courseId: courseId.toString(),
      enrollmentDate: enrollmentDate,
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.post(apiUrl, requestBody, { headers, observe: 'response' }).subscribe(
      (response) => {
        console.log('Enrolled successfully:', response);
        const responseBody = response.body as { message: string };
        if (responseBody) {
          const successMessage =
            responseBody.message === 'Re-Enrolled Successfully'
              ? 'Course Re-Enrolled successfully'
              : 'Course Enrolled successfully';
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Enrolled',
            detail: successMessage,
          });
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
        }
      },
      (error) => {
        console.error('Error enrolling course:', error);
        const errorMessage =
          error.status === 400 && error.error.message === 'User is already enrolled'
            ? 'Course already enrolled'
            : 'Failed to enroll. Please try again!';
        this.messageService.add({
          key: 'toast1',
          severity: error.status === 400 ? 'warn' : 'error',
          summary: 'Failed',
          detail: errorMessage,
        });
        console.error('Error details:', error.error);
      }
    );
  }

  fetchCategories(): void {
    this.http.get<any[]>('http://localhost:8080/auth/categories').subscribe(
      (response: any[]) => {
        this.categories = response.map((categoryString) => categoryString.split(', '));
        this.filteredCategories = this.categories.slice();
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  filterCategories(): void {
    this.filteredCategories = this.categories.filter((category) =>
      category[1].toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleCategory(category: any): void {
    const categoryId = category[0];
    this.http.get<any[]>(`http://localhost:8080/auth/${categoryId}`).subscribe(
      (response: any[]) => {
        this.courses = response;
        this.showEnrollment = false;
        this.selectedcategory = category[1] + ' Courses';
        this.coursecatelog = true;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  fetchCourseContent(courseId: number): void {
    this.http.get<any[]>(`http://localhost:8080/auth/course-content/${courseId}`).subscribe(
      (response: any[]) => {
        console.log(response);
        this.courseContent = response;
      },
      (error) => {
        console.error('Error fetching course content:', error);
      }
    );
  }

  toggleCourseContent(courseId: number): void {
    this.courses.forEach((course) => {
      course.showContent = false;
    });

    const index = this.courses.findIndex((course) => course.courseId === courseId);
    if (index !== -1) {
      this.courses[index].showContent = !this.courses[index].showContent;
      if (this.courses[index].showContent) {
        this.fetchCourseContent(courseId);
        this.selectedCourseId = courseId;
        this.showEnrollment = true;
        window.scrollTo(0, 0);
      }
    }
  }
}
