import { AnimationBuilder } from '@angular/animations';
import { EventEmitter, ElementRef, AfterViewInit, Renderer } from '@angular/core';
export declare class MglTimelineEntryContentComponent implements AfterViewInit {
    private elementRef;
    private animationBuilder;
    private renderer;
    private contentHeight;
    animationDone: EventEmitter<any>;
    private _expanded;
    expanded: boolean;
    constructor(elementRef: ElementRef, animationBuilder: AnimationBuilder, renderer: Renderer);
    ngAfterViewInit(): void;
    private getCollapsedStyle();
    private getExpandedStyle();
    animate(): void;
    setStyle(): void;
}
