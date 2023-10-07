import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @ViewChild('progressBar') progressBar: ElementRef;

  @Input() public value = 0;
  @Input() public max = 100;
  @Input() public previousValue;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const threshold = 0.2;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateProgressBar();
            observer.disconnect();
          }
        });
      },
      { threshold }
    );
    observer.observe(this.progressBar.nativeElement);
  }

  animateProgressBar() {
    this.previousValue = this.value;
  }
}
