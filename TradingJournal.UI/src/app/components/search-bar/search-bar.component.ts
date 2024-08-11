import { Component, DestroyRef, ElementRef, EventEmitter, input, Input, model, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter, fromEvent, Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit, OnDestroy {
  autoCompleteData = model<string[]>();
  @Output() searchInputEvent = new EventEmitter<string>();
  @Output() searchStockEvent = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  searchControl = new FormControl('');
  isInputActive: boolean = false;

  constructor(
      private destroyRef: DestroyRef,
      private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.getAutocompleteData()

    fromEvent(document, 'click').pipe(
        filter((event: Event) => {
          const clickedInside = this.elementRef.nativeElement.contains(event.target as Node);
          return !clickedInside;
        }),
        takeUntil(this.destroy$)
    ).subscribe(() => {
      this.isInputActive = false;
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  clear() {
    this.searchControl.setValue('');
  }

  getAutocompleteData() {
    this.searchControl.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef)
    ).subscribe(value => {
      if (value && value.length > 2) {
        this.searchInputEvent.emit(value);
      }
      else {
        this.autoCompleteData.update(() => ([]))
      }
    });
  }

  selectItem(item: string) {
    this.searchControl.setValue(item);
    this.isInputActive = false;
  }

  onFocus() {
    this.isInputActive = true;
  }

  onArrowUp(event: Event) {
    event.preventDefault();
  }

  onArrowDown(event: Event) {
    event.preventDefault();
  }

  onEnter(event: Event) {
    event.preventDefault();
    if (this.searchControl.value && this.searchControl.value.length > 2) {
      this.searchInputEvent.emit(this.searchControl.value);
    }

    this.onSearchStock();
  }

  onSearchStock() {
    let trimmedValue = this.searchControl.value?.split('|')[0].trim();
    this.searchStockEvent.emit(trimmedValue);
  }
}
