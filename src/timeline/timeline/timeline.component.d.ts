import { ElementRef, ChangeDetectorRef } from '@angular/core';
import { AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
export declare class MglTimelineComponent implements AfterViewInit, OnChanges, OnDestroy {
    private elementRef;
    private changeDetectorRef;
    toggle: boolean;
    alternate: boolean;
    start: 'left' | 'right';
    mobile: boolean;
    private _focusOnOpen;
    focusOnOpen: boolean;
    private subscriptions;
    private content;
    constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef);
    ngOnChanges(simpleChanges: any): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    private updateContent();
    onResize(ev: KeyboardEvent): void;
}
