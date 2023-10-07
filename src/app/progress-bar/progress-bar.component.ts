import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @ViewChild('progressBar') progressBar: ElementRef;

  @Input() public value = 0;
  @Input() public count = 0;
  @Input() public max = 100;
  @Input() public index;
  @Input() public previousValue;
  initValue: any = 0;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const threshold = 0.2;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateProgressBar(this.index, this.value);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );
    observer.observe(this.progressBar.nativeElement);
  }

  animateProgressBar(index, value) {
    // this.initValue = this.value;
    this.previousValue = this.value;
    // if (!!document.getElementsByTagName('progress')[index])
    // document.getElementsByTagName('progress')[index].value = value;
  }
}
