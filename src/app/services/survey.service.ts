import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  ip: string = '';
  // result: any[] = [];

  private result = new Subject<{result: any[]}>();
  private count = new Subject<{count: number}>();
  private confettiSubject = new Subject<void>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  getSurvey() {
    this.http.get<{ result: any[] }>(BACKEND_URL + '/survey/results').subscribe(data => {
      //this.result = data.result;
      this.result.next(data);
      this.getCount();
    });
  }

  getSurveyUpdateListener() {
    return this.result.asObservable();
  }

  getCount() {
    this.http.get<{ count: number }>(BACKEND_URL + '/survey/count').subscribe(data => {
      this.count.next(data);
    });
  }

  getCountUpdateListener() {
    return this.count.asObservable();
  }

  getIP() {
    this.http.get<{ ip: any }>(BACKEND_URL + '/survey/ip').subscribe(data => {
      this.ip = data.ip;
    });
  }

  saveSurvey(survey: string[]) {
    const post: object = {
      survey: survey,
      ip: this.ip
    };
    this.http
      .post<{ message: string }>(BACKEND_URL + '/survey', post)
      .subscribe({
        next: response => {
          this.showSuccess();
          this.getSurvey();
          this.getConfetti();
        },
        error: error => {
          this.showError();
        }
      });
  }

  getConfetti() {
    this.confettiSubject.next();
  }

  getConfettiUpdateListener() {
    return this.confettiSubject.asObservable();
  }

  showSuccess() {
    this.toastr.success('The survey was sent successfully. Thanks for your participation!');
  }

  showError() {
    this.toastr.error('You have already taken the survey.');
  }

}
