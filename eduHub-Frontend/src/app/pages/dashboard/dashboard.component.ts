import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { last } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, CoursesComponent, FormsModule,ButtonModule,ToastModule],
  providers: [MessageService]

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
  username: string | null = null;
  modalCourse: any;
  allenrollcourses:boolean = false;
  showAchievementsSection: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.fetchEnrolledCourses();
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      this.username = this.authService.getUsername();
            // console.log("name",this.username);
    }
  }
  fetchEnrolledCourses(): void {
    const token = this.authService.getToken();
    if (!token) {
        // console.error('No token available for enrolled courses');
        return;
    }
  
    const apiUrl = 'http://localhost:8080/api/get-enrolled-courses';
    const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
    });
  
    this.http.get<any[]>(apiUrl, { headers }).subscribe(
        (courses) => {
            if (courses.length === 0) {
                this.allenrollcourses = true;
                console.log("No courses enrolled");
            } else {
                this.enrolledCourses = courses;
                courses.forEach(course => {
                    this.fetchProgress(course.enrollmentId);
                    console.log("enrolled courses",this.enrolledCourses);
                });
            }
        },
        (error) => {
            console.error('Error fetching enrolled courses:', error);
        }
    );
  }

  fetchProgress(enrollmentId: number): void {
    const token = this.authService.getToken();
    if (!token) {
      return;
    }
  
    const apiUrl = `http://localhost:8080/trackprogress/${enrollmentId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.get<any>(apiUrl, { headers }).subscribe(
      (progress) => {
        const course = this.enrolledCourses.find(course => course.enrollmentId === enrollmentId);
        if (course && progress) {
          course.progressPercentage = progress.progressPercentage;
          course.lastAccessedDate = progress.lastAccessedDate; // Store last accessed date
          this.progressData = [];
          this.selectedCourse = course;
          this.progressData.push(progress);
          this.calculateContentStatus();
        }
      },
      (error) => {
        console.error('Error fetching progress for enrollmentId:', error);
      }
    );
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
  toggleCourseContent(courseId: number): void {
    if (this.showCourseOverviewSection && this.selectedCourse && this.selectedCourse.course.courseId === courseId) {
      this.resetCourseOverview();
    } else {
      this.fetchCourseContent(courseId);
      const course = this.enrolledCourses.find(course => course.course.courseId === courseId);
      if (course) {
        this.selectedCourse = course;
        this.showCourseOverviewSection = true;
        this.progressData = [];
        this.fetchProgress(course.enrollmentId);
      }
    }
  }
  viewCourseDetails(course: any): void {
    this.selectedCourse = course;

    // Check if the progress entry already exists for this course
    const progress = this.progressData.find(progress => progress.enrollmentId === course.enrollmentId);
    if (!progress) {
      this.createProgressEntry(course.enrollmentId);
    } else {
      this.toggleCourseContent(course.course.courseId);
    }
  }


 
  
  

  
  createProgressEntry(enrollmentId: number): void {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available for creating progress entry');
      return;
    }
  
    // Check if a progress entry already exists for this enrollmentId
    const existingProgress = this.progressData.find(progress => progress.enrollmentId === enrollmentId);
    if (existingProgress) {
      console.log('Progress entry already exists for enrollmentId:', enrollmentId);
      return; // Exit the method if a progress entry already exists
    }
  
    const lastAccessed = new Date().toISOString().split('T')[0];
  
    const apiUrl = 'http://localhost:8080/trackprogress/create';
    const requestBody = {
      enrollmentId: enrollmentId,
      progressPercentage: 0,
      lastAccessedDate: lastAccessed
    };
    console.log("createenry is ", requestBody);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    this.http.post<any>(apiUrl, requestBody, { headers }).subscribe(
      (response) => {
        this.messageService.add({key:'toast1',severity:'success', summary:'Hurray', detail:'Started Learning the course'});
        console.log('Progress entry created successfully:', response);
      },
      (error) => {
        console.error('Error creating progress entry:', error);
      }
    );
  }
  
  

  
  
  
  calculateContentStatus(): void {
    if (!this.selectedCourse || !this.selectedCourse.courseContent) {
      return;
    }
  
    const totalModules = this.selectedCourse.courseContent.length;
    const completedModules = Math.round((this.selectedCourse.progressPercentage / 100) * totalModules);
  
    for (let i = 0; i < totalModules; i++) {
      this.selectedCourse.courseContent[i].status = i < completedModules ? 'READ' : 'UNREAD';
    }
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
  goBackToCourses(): void {
    this.resetCourseOverview();
  }

  resetCourseOverview(): void {
    this.selectedCourse = null;
    this.showCourseOverviewSection = false; // Hide course overview section
  }
  showCourseOverview(course: any): void {
    this.selectedCourse = course;
  }



  toggleContentStatus(content: any, index: number): void {
    if (content.status === 'READ') {
      // Check if any subsequent modules are marked as 'READ' before marking this one as 'UNREAD'
      for (let i = index + 1; i < this.selectedCourse.courseContent.length; i++) {
        if (this.selectedCourse.courseContent[i].status === 'READ') {
          this.messageService.add({ key: 'toast1', severity: 'warn', summary: 'Warning', detail: 'You need to mark the subsequent modules as unread first.' });
          return;
        }
      }
      // Mark as unread
      content.status = 'UNREAD';
    } else {
      // Check if the previous module is marked as 'READ' before marking this one as 'READ'
      if (index > 0 && this.selectedCourse.courseContent[index - 1].status !== 'READ') {
        this.messageService.add({ key: 'toast1', severity: 'warn', summary: 'Warning', detail: 'You need to complete the previous module first.' });
        return;
      }
      // Mark as read
      content.status = 'READ';
    }
  
    this.updateProgressPercentage(this.selectedCourse.enrollmentId);
  }
  
  
  
  

  updateProgressPercentage(enrollmentId: number): void {
    const updatedPercentage = this.calculateTotalProgress();
  
    const lastAccessed = new Date().toISOString().split('T')[0];
    const apiUrl = `http://localhost:8080/trackprogress/updatePercentage`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    const body = {
      enrollmentId: enrollmentId,
      progressPercentage: updatedPercentage,
      lastAccessedDate: lastAccessed
    };
  
    this.http.put<any>(apiUrl, body, { headers }).subscribe(
      (response) => {
        console.log('Progress updated successfully');
        this.fetchProgress(enrollmentId);
      },
      (error) => {
        console.error('Error updating progress:', error);
      }
    );
  }
  
  
  getAchievedCourses(): any[] {
    return this.enrolledCourses.filter(course => course.progressPercentage === 100);
  }
  showAchievements(event: Event): void {
    event.preventDefault(); // Prevent default anchor behavior
    this.showCourseOverviewSection = false;
    this.showAchievementsSection = true;
  }
  


  
  checkUnenrollProgress(enrolledCourse: any): void {
    if (enrolledCourse.progressPercentage > 25) {
      console.log('Unenroll is not possible above 25% progress.');
    } else {
      this.unenrollCourse(enrolledCourse);
    }
  }
unenrollCourse(enrolledCourse: any): void {
  this.modalCourse = enrolledCourse;
}
unenrollCourseConfirm(courseId: number): void {
  const token = this.authService.getToken();
  if (!token) {
      console.error('No token available');
      return;
  }
  const apiUrl = `http://localhost:8080/api/unsubscribeCourse`;
  const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
  });
  const body = {
      courseId: courseId
  };
  this.http.put<any>(apiUrl, body, { headers }).subscribe(
      () => {
          console.log('Unenrolled successfully');
          this.resetProgressPercentage(this.modalCourse.enrollmentId);
          this.messageService.add({key:'toast1',severity:'warn', summary:'Unenrolled', detail:'Unenrolled successfully!'});
          // Remove the unenrolled course from the enrolledCourses array
          this.enrolledCourses = this.enrolledCourses.filter(course => course.course.courseId !== courseId);
          // Check if there are no enrolled courses left
          if (this.enrolledCourses.length === 0) {
              this.allenrollcourses = true;
          }
          // Update the view
          setTimeout(() => {
              this.fetchEnrolledCourses();
          },2000);
      },
      (error) => {
          console.error('Error unenrolling from course:', error);
          this.messageService.add({key:'toast1',severity:'error', summary:'Server Error', detail:'Error unenrolling from course!'});
      }
  );
}

resetProgressPercentage(enrollmentId: number): void {
  const updatedPercentage = 0;
  const lastAccessed = null;
  const apiUrl = `http://localhost:8080/trackprogress/updatePercentage`;
  const token = this.authService.getToken();
  const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
  });
  const body = {
      enrollmentId: enrollmentId,
      progressPercentage: updatedPercentage,
      lastAccessedDate: lastAccessed
  };

  console.log("reset", body);

  this.http.put<any>(apiUrl, body, { headers }).subscribe(
      () => {
          console.log('Reset course progress successfully');
          
          // this.fetchEnrolledCourses();  
      },
      (error) => {
          console.error('Error resetting progress:', error);
      }
  );
}

}