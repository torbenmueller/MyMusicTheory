import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Category } from '../interfaces/category';
import { SurveyService } from '../services/survey.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  checkCounter: number = 0;

  categories: Category = {
    notation: 'Notation',
    rhythmAndMeter: 'Rhythm and meter',
    scalesAndKeySignatures: 'Scales and key signatures',
    intervals: 'Intervals',
    chords: 'Chords',
    chordProgressions: 'Chord progressions',
    modulation: 'Modulation'
  };

  objectValues = Object.values;

  survey: string[] = [];
  result: any[] = [];
  count: number = 0;
  sortedDataWithPercentage: any[] = [];
  previousValues: number[] = new Array(7).fill(0);

  private surveySub: Subscription;
  private countSub: Subscription;

  constructor(
    private surveyService: SurveyService,
    private http: HttpClient,
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.surveyService.getIP();
    this.surveyService.getSurvey();
    this.surveySub = this.surveyService
      .getSurveyUpdateListener()
      .subscribe((data: {result: any[]}) => {
        this.result = data.result;
        this.calculatePercentage();
      });
    this.countSub = this.surveyService
      .getCountUpdateListener()
      .subscribe((data: {count: number}) => {
        this.count = data.count;
      });
    this.surveyService.getConfettiUpdateListener().subscribe(() => {
      this.surprise();
    });
  }

  calculatePercentage() {
    const maxCount = this.result.reduce((max, obj) => obj.count > max ? obj.count : max, this.result[0].count);
    const dataWithPercentage = this.result.map(obj => {
      return {
        category: obj._id,
        count: obj.count,
        percentage: Math.round((obj.count / maxCount) * 100)
      }
    });
    this.sortedDataWithPercentage = dataWithPercentage.sort((a, b) => a.category.localeCompare(b.category));
  }

  check(id: string) {
    this.getPreviousValues();
    const checkbox = document.getElementById(id) as HTMLInputElement | null;
    if (checkbox?.checked) {
      if (this.checkCounter < 3) {
        this.checkCounter++;
        this.survey.push(this.categories[id]);
      } else {
        checkbox.checked = false;
      }
    } else {
      this.checkCounter--;
      this.survey = this.survey.filter((e) => e !== this.categories[id]);
    }
  }

  submitSurvey() {
    this.surveyService.saveSurvey(this.survey);
    this.deselectAllCheckboxes();
  }

  public surprise(): void {
    const canvas = this.renderer2.createElement('canvas');
    this.renderer2.appendChild(this.elementRef.nativeElement, canvas);
    const myConfetti = confetti.create(canvas, { resize: true });
    myConfetti();
    setTimeout(() => {
      this.renderer2.removeChild(this.elementRef.nativeElement, canvas);
    }, 3000);
  }

  deselectAllCheckboxes() {
    for (let i = 0; i < this.survey.length; i++) {
      let checkboxId: string =
        Object.keys(this.categories).find(
          (key) => this.categories[key] === this.survey[i]
        ) || '';
      const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
      checkbox.checked = false;
    }
    this.checkCounter = 0;
    this.survey = [];
  }

  getPreviousValues() {
		this.previousValues = [];
		this.sortedDataWithPercentage.forEach(item => {
			this.previousValues.push(item.percentage);
		});
	}
}
