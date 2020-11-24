import { Component, OnInit, Input, ElementRef , ViewChild } from '@angular/core';

@Component({
  selector: 'app-text-area-component',
  templateUrl: './text-area-component.component.html',
  styleUrls: ['./text-area-component.component.scss']
})
export class TextAreaComponentComponent implements OnInit {
  @ViewChild('textAreaInput', { read: ElementRef }) textAreaInput: ElementRef;
  @Input() value: any;
  @Input() prop: any;
  constructor() { }

  ngOnInit() {
  }

  getValue() {
    console.log(this.textAreaInput);
    return this.textAreaInput.nativeElement.value;
  }

}
