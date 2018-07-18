import { QueryList, ElementRef } from '@angular/core';
import { MglTimelineEntryComponent } from './../timeline-entry/timeline-entry.component';
import { Component, Input, ContentChildren, AfterViewInit, HostBinding, EventEmitter, Output, HostListener, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'mgl-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class MglTimelineComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input()
  toggle: boolean = true;

  @Input()
  alternate: boolean = true;

  private _mobile: boolean = false;

  set mobile(mobile: boolean) {
    if (mobile !== this._mobile) {
      this.content && this.content.forEach(entry => entry.mobile = mobile);
    }
    setTimeout(() => {
      // Prevent ExpressionChangedAfterItHasBeenCheckedError exception
      this._mobile = mobile;
    });
  }

  @HostBinding('class.mobile')
  get mobile() {
    return this._mobile;
  }

  private _focusOnOpen = false;

  @Input()
  set focusOnOpen(focusOnOpen) {
    this.content && this.content.forEach(entry => entry.focusOnOpen = focusOnOpen);
    this._focusOnOpen = focusOnOpen;
  }

  get focusOnOpen() {
    return this._focusOnOpen;
  }

  private subscriptions: Subscription[] = [];

  @ContentChildren(MglTimelineEntryComponent)
  private content: QueryList<MglTimelineEntryComponent>;

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(simpleChanges) {
    this.updateContent();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngAfterViewInit() {
    this.mobile = this.elementRef.nativeElement.clientWidth < 640;
    setTimeout(() => this.updateContent());
    this.content.changes.subscribe(() => this.updateContent());
  }

  private updateContent() {
    this.ngOnDestroy();
    if (this.content) {
      this.content.forEach((entry, index) => {
        if (this.toggle) {
          this.subscriptions.push(
            entry.changed.subscribe(state => {
              if (state === true) {
                this.content.filter(e => e !== entry).forEach(e => e.collapse());
              }
            }));
        }
        entry.alternate = this.alternate ? index % 2 !== 0 : false;
        entry.mobile = this.mobile;
        entry.focusOnOpen = this.focusOnOpen;
      });

    }
  }

  @HostListener('window:resize')
  onResize(ev: KeyboardEvent) {
    this.mobile = this.elementRef.nativeElement.clientWidth < 640;
  }
}
