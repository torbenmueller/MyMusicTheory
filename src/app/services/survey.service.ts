import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

const BACKEND_URL = environment.apiUrl + "/survey";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  ip: string = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getIP() {
		this.http.get<{ip: any}>(BACKEND_URL + '/ip')
			.subscribe((data) => {
				this.ip = data.ip;
        console.log("IP", this.ip);
			});
	}

  saveSurvey(survey: string[]) {
    const post: object = {
			survey: survey
		}
    this.http.post<{message: string}>(BACKEND_URL, post)
        .subscribe((responseData) => {
          // console.log(responseData.message);
          this.showSuccess();
        });
  }

  showSuccess() {
    this.toastr.success('The survey was sent successfully!');
  }

}
