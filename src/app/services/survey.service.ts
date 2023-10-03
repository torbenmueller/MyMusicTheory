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
  private title: any = {};
  private titleUpdated = new Subject();

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getTitle() {
    this.http
      .get<{ message: string; title: any }>(BACKEND_URL + '/title')
      .subscribe((data) => {
        this.title = data.title;
        this.titleUpdated.next(this.title);
      });
  }

  getTitleUpdateListener() {
    return this.titleUpdated.asObservable();
  }

  /* getIP() {
		this.http.get<{ip: any}>(BACKEND_URL + '/ip')
			.subscribe((data) => {
				this.ip = data.ip;
        console.log("IP", this.ip);
			});
	} */

  saveSurvey(survey: string[]) {
    const post: object = {
      survey: survey,
    };
    this.http
      .post<{ message: string }>(BACKEND_URL + '/survey', post)
      .subscribe((responseData) => {
        // console.log(responseData.message);
        this.showSuccess();
      });
  }

  showSuccess() {
    this.toastr.success('The survey was sent successfully!');
  }
}
