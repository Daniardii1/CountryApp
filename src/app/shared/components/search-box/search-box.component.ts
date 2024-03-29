import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})

export class SearchBoxComponent {

  @Input()
  public placeholder: string = '';

  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>;

  @Output()
  public OnValue: EventEmitter<string> = new EventEmitter<string>();

  emitValue(term: string): void {
    this.OnValue.emit(term);
    this.txtInput.nativeElement.value = '';
  }
}
