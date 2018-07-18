import { MglTimelineEntrySideComponent } from './../timeline-entry-side/timeline-entry-side.component';
import { MglTimelineEntryDotComponent } from './../timeline-entry-dot/timeline-entry-dot.component';
import { AfterViewInit, EventEmitter, OnDestroy, ElementRef } from '@angular/core';
import { MglTimelineEntryContentComponent } from '../timeline-entry-content/timeline-entry-content.component';
import { MglTimelineEntryHeaderComponent } from '../timeline-entry-header/timeline-entry-header.component';
export declare class MglTimelineEntryComponent implements AfterViewInit, OnDestroy {
    private elementRef;
    constructor(elementRef: ElementRef);
    private subscriptions;
    focusOnOpen: boolean;
    expanded: boolean;
    private _alternate;
    alternate: boolean;
    private _mobile;
    mobile: boolean;
    changed: EventEmitter<boolean>;
    animationDone: EventEmitter<string>;
    content: MglTimelineEntryContentComponent;
    header: MglTimelineEntryHeaderComponent;
    dot: MglTimelineEntryDotComponent;
    side: MglTimelineEntrySideComponent;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    collapse(): void;
    expand(): void;
    toggle(): void;
}
