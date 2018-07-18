import { AnimationBuilder } from '@angular/animations';
import { EventEmitter, ElementRef, AfterViewInit, Renderer } from '@angular/core';
export declare class MglTimelineEntryContentComponent implements AfterViewInit {
    private elementRef;
    private animationBuilder;
    private renderer;
    private _expanded;
    private contentHeight;
    animationDone: EventEmitter<any>;
    constructor(elementRef: ElementRef, animationBuilder: AnimationBuilder, renderer: Renderer);
    ngAfterViewInit(): void;
    expanded: boolean;
    private getCollapsedStyle();
    private getExpandedStyle();
    animate(): void;
    setStyle(): void;
}
