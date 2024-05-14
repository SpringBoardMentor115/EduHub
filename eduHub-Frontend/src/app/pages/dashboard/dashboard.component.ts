import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, CoursesComponent, FormsModule]
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  enrolledCourses: any[] = [];
  courses: any[] = [];
  courseContent: any[] = [];
  selectedCourse: any;
  progressData: any[] = [];
  isSidebarVisible: boolean = false;
  showCourseOverviewSection: boolean = false; // New property to control visibility

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.fetchEnrolledCourses();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  toggleCourseContent(courseId: number): void {
    const course = this.enrolledCourses.find(course => course.course.courseId === courseId);
    if (course) {
      course.showContent = !course.showContent;
      if (course.showContent) {
        this.fetchCourseContent(courseId);
        this.progressData = [];
        this.fetchProgress(course.enrollmentId);
        this.selectedCourse = course;
        this.showCourseOverviewSection = true; // Show course overview section
      } else {
        this.selectedCourse = null;
        this.showCourseOverviewSection = false; // Hide course overview section
      }
    }
  }

  goBackToCourses(): void {
    this.showCourseOverviewSection = false; // Hide course overview section
  }

  fetchEnrolledCourses(): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available for enrolled courses');
      return;
    }

    const apiUrl = 'http://localhost:8080/api/get-enrolled-courses';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any[]>(apiUrl, { headers }).subscribe(
      (courses) => {
        this.enrolledCourses = courses;
        courses.forEach(course => {
          this.fetchProgress(course.enrollmentId);
        });
        console.log(this.enrolledCourses);
      },
      (error) => {
        console.error('Error fetching enrolled courses:', error);
      }
    );
  }

  fetchProgress(enrollmentId: number): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available');
      return;
    }

    const apiUrl = `http://localhost:8080/trackprogress/${enrollmentId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(apiUrl, { headers }).subscribe(
      (progress) => {
        this.progressData.push(progress);
      },
      (error) => {
        console.error('Error fetching progress for enrollmentId:', error);
      }
    );
  }

  fetchCourseContent(courseId: number): void {
    this.http.get<any[]>(`http://localhost:8080/auth/course-content/${courseId}`).subscribe(
      (response: any[]) => {
        console.log(response);
        const course = this.enrolledCourses.find(course => course.course.courseId === courseId);
        if (course) {
          course.courseContent = response;
        }
      },
      (error) => {
        console.error('Error fetching course content:', error);
      }
    );
  }

  showCourseOverview(course: any): void {
    this.selectedCourse = course;
  }

  toggleContentStatus(content: any): void {
    content.status = content.status === 'READ' ? 'UNREAD' : 'READ';
  }

  calculateTotalProgress(): number {
    if (!this.selectedCourse.courseContent || this.selectedCourse.courseContent.length === 0) {
      return 0;
    }
    const totalItems = this.selectedCourse.courseContent.length;
    let readItems = 0;
    for (const content of this.selectedCourse.courseContent) {
      if (content.status === 'READ') {
        readItems++;
      }
    }
    return (readItems / totalItems) * 100;
  }


  unenrollCourse(courseId: number): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available');
      return;
    }
  
    const apiUrl = `http://localhost:8080/api/unsubscribeCourse`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' // Add content type header
    });
  
    // Extract user ID from the token
    const decodedToken = this.decodeToken(token);
    const userId = decodedToken.userId;
  
    this.http.put<any>(
      apiUrl,
      { userId, courseId }, // Pass userId and courseId in the request body
      { headers } // Pass headers as the third argument
    ).subscribe(
      () => {
        console.log('Successfully unsubscribed from course');
        this.enrolledCourses = this.enrolledCourses.filter(course => course.course.courseId !== courseId);
      },
      (error: HttpErrorResponse) => {
        console.error('Error unsubscribing from course:', error);
      }
    );
  }
  
  // Function to decode JWT token
  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  initializeDarkModeToggle(): void {
    const toggleBtn = document.getElementById('toggle-btn');

    if (!toggleBtn) {
      console.error("Toggle button not found");
      return;
    }

    const body = document.body;
    let darkMode = localStorage.getItem('dark-mode');

    const enableDarkMode = () => {
      toggleBtn.classList.replace('fa-sun', 'fa-moon');
      body.classList.add('dark');
      localStorage.setItem('dark-mode', 'enabled');
    };

    const disableDarkMode = () => {
      toggleBtn.classList.replace('fa-moon', 'fa-sun');
      body.classList.remove('dark');
      localStorage.setItem('dark-mode', 'disabled');
    };

    if (darkMode === 'enabled') {
      enableDarkMode();
    }

    toggleBtn.addEventListener('click', () => {
      darkMode = localStorage.getItem('dark-mode');
      if (darkMode === 'disabled') {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });
  }
}
