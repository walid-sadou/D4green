import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit {
  @Input('title') title: string;
  @Input('iconPath') iconPath: string;
  @Input('buttonFunction') buttonFunction: () => void;
  @Input('buttonName') buttonName: string;

  @Output() buttonClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public buttonClick() {
    if (this.buttonFunction) {
      this.buttonFunction();
    }
    this.buttonClicked.emit();
  }
}
