import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})

export class SearchBoxComponent implements OnInit{

  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @ViewChild('txtInput')
  public txtInput!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        this.onDebounce.emit(value);
      });
  }

  emitValue(term: string): void {
    this.onValue.emit(term);
    this.txtInput.nativeElement.value = '';
  }

  onKeyPress(searchTerm: string): void {
    this.debouncer.next(searchTerm);
  }
}
