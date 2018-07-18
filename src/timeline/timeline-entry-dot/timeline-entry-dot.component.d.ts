import { ElementRef, EventEmitter, AfterViewInit, Renderer } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
export declare class MglTimelineEntryDotComponent implements AfterViewInit {
    private animationBuilder;
    private elementRef;
    private renderer;
    private _expanded;
    private _alternate;
    private _mobile;
    private initialStyle;
    private _size;
    private animation;
    animationDone: EventEmitter<any>;
    color: string;
    constructor(animationBuilder: AnimationBuilder, elementRef: ElementRef, renderer: Renderer);
    ngAfterViewInit(): void;
    size: number;
    alternate: boolean;
    mobile: boolean;
    expanded: boolean;
    private getCollapsedStyle();
    private getTransitionStyle();
    private getExpandedStyle();
    private animate();
    private setStyle();
    private destroyAnimation();
}
