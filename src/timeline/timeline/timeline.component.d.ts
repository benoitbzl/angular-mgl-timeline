import { ElementRef } from '@angular/core';
import { AfterViewInit, OnChanges, OnDestroy } from '@angular/core';
export declare class MglTimelineComponent implements AfterViewInit, OnChanges, OnDestroy {
    private elementRef;
    toggle: boolean;
    alternate: boolean;
    private _mobile;
    mobile: boolean;
    private _focusOnOpen;
    focusOnOpen: boolean;
    private subscriptions;
    private content;
    constructor(elementRef: ElementRef);
    ngOnChanges(simpleChanges: any): void;
    ngOnDestroy(): void;
    ngAfterViewInit(): void;
    private updateContent();
    onResize(ev: KeyboardEvent): void;
}
