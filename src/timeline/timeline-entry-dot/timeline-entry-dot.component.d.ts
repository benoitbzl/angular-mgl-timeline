import { ElementRef, EventEmitter, AfterViewInit, Renderer, ChangeDetectorRef } from '@angular/core';
import { AnimationBuilder } from '@angular/animations';
export declare class MglTimelineEntryDotComponent implements AfterViewInit {
    private animationBuilder;
    private elementRef;
    private renderer;
    private changeDetectorRef;
    private _expanded;
    private _alternate;
    private _mobile;
    private initialStyle;
    private _size;
    private animation;
    animationDone: EventEmitter<any>;
    clazz: string;
    size: number;
    alternate: boolean;
    mobile: boolean;
    expanded: boolean;
    constructor(animationBuilder: AnimationBuilder, elementRef: ElementRef, renderer: Renderer, changeDetectorRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    private getCollapsedStyle();
    private getTransitionStyle();
    private getExpandedStyle();
    private animate();
    private setStyle();
    private destroyAnimation();
}
