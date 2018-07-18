import { Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgModule, Output, Renderer } from '@angular/core';
import { AnimationBuilder, animate, style } from '@angular/animations';

class MglTimelineEntryHeaderComponent {
}
MglTimelineEntryHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-header',
                template: `
    <ng-content></ng-content>
  `,
                styles: [`
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      padding: 15px;
      text-align: center; }
  `]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntryHeaderComponent.ctorParameters = () => [];

class MglTimelineEntryDotComponent {
    /**
     * @param {?} animationBuilder
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(animationBuilder, elementRef, renderer) {
        this.animationBuilder = animationBuilder;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._expanded = false;
        this._alternate = false;
        this._mobile = false;
        this._size = 50;
        this.animationDone = new EventEmitter();
        this.color = 'primary';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initialStyle = window.getComputedStyle(this.elementRef.nativeElement);
        this.setStyle();
    }
    /**
     * @param {?} size
     * @return {?}
     */
    set size(size) {
        this._size = size;
        this.setStyle();
    }
    /**
     * @return {?}
     */
    get size() {
        return this._size;
    }
    /**
     * @param {?} alternate
     * @return {?}
     */
    set alternate(alternate) {
        this._alternate = alternate;
        this.setStyle();
    }
    /**
     * @return {?}
     */
    get alternate() {
        return this._alternate;
    }
    /**
     * @param {?} mobile
     * @return {?}
     */
    set mobile(mobile) {
        this._mobile = mobile;
        this.setStyle();
    }
    /**
     * @return {?}
     */
    get mobile() {
        return this._mobile;
    }
    /**
     * @param {?} expanded
     * @return {?}
     */
    set expanded(expanded) {
        const /** @type {?} */ animate$$1 = this._expanded !== expanded;
        this._expanded = expanded;
        animate$$1 ? this.animate() : this.setStyle();
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @return {?}
     */
    getCollapsedStyle() {
        return {
            top: '50%',
            left: (this.alternate || this.mobile) ? '-5px' : 'calc(100% + 5px)',
            width: this.size + 'px',
            height: this.size + 'px',
            opacity: 1,
            transform: 'translateY(-50%) translateX(-50%)',
            boxShadow: this.initialStyle && this.initialStyle.boxShadow,
            borderRadius: '100px'
        };
    }
    /**
     * @return {?}
     */
    getTransitionStyle() {
        return Object.assign({}, this.getCollapsedStyle(), { left: '50%', opacity: 0.5, boxShadow: 'none' });
    }
    /**
     * @return {?}
     */
    getExpandedStyle() {
        return Object.assign({}, this.getTransitionStyle(), { left: '0', transform: 'translateX(0) translateY(-50%)', width: '100%', height: '100%', opacity: 1, borderRadius: 0 });
    }
    /**
     * @return {?}
     */
    animate() {
        this.destroyAnimation();
        if (this.expanded) {
            this.animation = this.animationBuilder
                .build([
                style(this.getCollapsedStyle()),
                animate('200ms ease', style(this.getTransitionStyle())),
                animate('200ms ease', style(this.getExpandedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            this.animation.onDone(() => this.animationDone.emit({ toState: 'expanded' }));
            this.animation.play();
        }
        else {
            this.animationBuilder;
            this.animation = this.animationBuilder
                .build([
                style(this.getExpandedStyle()),
                animate('100ms ease', style(this.getTransitionStyle())),
                animate('100ms ease', style(this.getCollapsedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            this.animation.onDone(() => this.animationDone.emit({ toState: 'collapsed' }));
            this.animation.play();
        }
    }
    /**
     * @return {?}
     */
    setStyle() {
        this.destroyAnimation();
        const /** @type {?} */ baseStyle = this.expanded ? this.getExpandedStyle() : this.getCollapsedStyle();
        Object.keys(baseStyle).forEach(property => {
            this.renderer.setElementStyle(this.elementRef.nativeElement, property, baseStyle[property]);
        });
    }
    /**
     * @return {?}
     */
    destroyAnimation() {
        if (this.animation) {
            this.animation.destroy();
            delete this.animation;
        }
    }
}
MglTimelineEntryDotComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-dot',
                template: `
    <ng-content></ng-content>
  `,
                styles: [`
    :host {
      display: block;
      position: absolute; }
  `]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntryDotComponent.ctorParameters = () => [
    { type: AnimationBuilder, },
    { type: ElementRef, },
    { type: Renderer, },
];
MglTimelineEntryDotComponent.propDecorators = {
    'color': [{ type: Input }, { type: HostBinding, args: ['class',] },],
    'size': [{ type: Input },],
};

class MglTimelineEntryContentComponent {
    /**
     * @param {?} elementRef
     * @param {?} animationBuilder
     * @param {?} renderer
     */
    constructor(elementRef, animationBuilder, renderer) {
        this.elementRef = elementRef;
        this.animationBuilder = animationBuilder;
        this.renderer = renderer;
        this._expanded = false;
        this.animationDone = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.contentHeight = this.elementRef.nativeElement.scrollHeight;
        this.setStyle();
    }
    /**
     * @param {?} expanded
     * @return {?}
     */
    set expanded(expanded) {
        this.contentHeight = this.elementRef.nativeElement.scrollHeight;
        const /** @type {?} */ animate$$1 = this._expanded !== expanded;
        this._expanded = expanded;
        animate$$1 ? this.animate() : this.setStyle;
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @return {?}
     */
    getCollapsedStyle() {
        return {
            height: 0
        };
    }
    /**
     * @return {?}
     */
    getExpandedStyle() {
        return {
            height: this.contentHeight + 'px'
        };
    }
    /**
     * @return {?}
     */
    animate() {
        if (this.expanded) {
            const /** @type {?} */ animation = this.animationBuilder
                .build([
                style(this.getCollapsedStyle()),
                animate('100ms ease', style(this.getExpandedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            animation.onDone(() => this.animationDone.emit({ toState: 'expanded' }));
            animation.play();
        }
        else {
            this.animationBuilder;
            const /** @type {?} */ animation = this.animationBuilder
                .build([
                style(this.getExpandedStyle()),
                animate('200ms ease', style(this.getCollapsedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            animation.onDone(() => this.animationDone.emit({ toState: 'collapsed' }));
            animation.play();
        }
    }
    /**
     * @return {?}
     */
    setStyle() {
        const /** @type {?} */ baseStyle = this.expanded ? this.getExpandedStyle() : this.getCollapsedStyle();
        Object.keys(baseStyle).forEach(property => {
            this.renderer.setElementStyle(this.elementRef.nativeElement, property, baseStyle[property]);
        });
    }
}
MglTimelineEntryContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-content',
                template: `
    <div><ng-content></ng-content></div>
  `,
                styles: [`
    :host {
      position: relative;
      display: block;
      overflow: hidden; }
      :host > div {
        padding: 10px; }
  `]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntryContentComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: AnimationBuilder, },
    { type: Renderer, },
];

class MglTimelineEntrySideComponent {
    constructor() {
        this.alternate = false;
        this.mobile = false;
    }
}
MglTimelineEntrySideComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-side',
                template: `
    <ng-content></ng-content>
  `,
                styles: [`
    :host {
      position: absolute;
      top: 0;
      left: 100%;
      width: 100%;
      text-align: center; }
      :host.alternate {
        left: -100%; }
      :host.mobile {
        display: none; }
  `]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntrySideComponent.ctorParameters = () => [];
MglTimelineEntrySideComponent.propDecorators = {
    'alternate': [{ type: HostBinding, args: ['class.alternate',] },],
    'mobile': [{ type: HostBinding, args: ['class.mobile',] },],
};

class MglTimelineEntryComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.subscriptions = [];
        this.focusOnOpen = false;
        this._alternate = false;
        this._mobile = false;
        this.changed = new EventEmitter();
        this.animationDone = new EventEmitter();
    }
    /**
     * @param {?} expanded
     * @return {?}
     */
    set expanded(expanded) {
        if (this.dot && expanded) {
            this.dot.expanded = expanded;
        }
        else {
            this.content.expanded = expanded;
        }
        this.changed.emit(expanded);
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this.dot ? (this.dot.expanded && this.content.expanded) : this.content.expanded;
    }
    /**
     * @param {?} alternate
     * @return {?}
     */
    set alternate(alternate) {
        setTimeout(() => {
            // Prevent ExpressionChangedAfterItHasBeenCheckedError exception
            this._alternate = alternate;
        });
        if (this.dot) {
            this.dot.alternate = this._alternate;
        }
        if (this.side) {
            this.side.alternate = this._alternate;
        }
    }
    /**
     * @return {?}
     */
    get alternate() {
        return this._alternate;
    }
    /**
     * @param {?} mobile
     * @return {?}
     */
    set mobile(mobile) {
        setTimeout(() => {
            // Prevent ExpressionChangedAfterItHasBeenCheckedError exception
            this._mobile = mobile;
        });
        if (this.dot) {
            this.dot.mobile = this._mobile;
        }
        if (this.side) {
            this.side.mobile = this._mobile;
        }
    }
    /**
     * @return {?}
     */
    get mobile() {
        return this._mobile;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            if (this.dot) {
                this.subscriptions.push(this.dot.animationDone.subscribe(event => {
                    if (event.toState === 'expanded') {
                        this.content.expanded = true;
                    }
                    else {
                        this.animationDone.emit(event);
                    }
                }));
            }
            this.subscriptions.push(this.content.animationDone.subscribe(event => {
                if (this.dot && event.toState === 'collapsed') {
                    this.dot.expanded = false;
                }
                else {
                    if (this.focusOnOpen) {
                        this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    this.animationDone.emit(event);
                }
            }));
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    /**
     * @return {?}
     */
    collapse() {
        this.expanded = false;
    }
    /**
     * @return {?}
     */
    expand() {
        this.expanded = true;
    }
    /**
     * @return {?}
     */
    toggle() {
        this.expanded = !this.expanded;
    }
}
MglTimelineEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry',
                template: `
    <ng-content select="mgl-timeline-entry-side"></ng-content>
    <div class="mgl-timeline-entry-card">
      <div class="mgl-timeline-entry-card-header" (click)="toggle()">
        <ng-content select="mgl-timeline-entry-dot"></ng-content>
        <ng-content select="mgl-timeline-entry-header"></ng-content>
      </div>
      <ng-content select="mgl-timeline-entry-content"></ng-content>
    </div>
  `,
                styles: [`
    /**
     * Applies styles for users in high contrast mode. Note that this only applies
     * to Microsoft browsers. Chrome can be included by checking for the \`html[hc]\`
     * attribute, however Chrome handles high contrast differently.
     */
    /* Theme for the ripple elements.*/
    /* stylelint-disable material/no-prefixes */
    /* stylelint-enable */
    :host {
      display: block;
      position: relative;
      margin-bottom: 50px;
      width: calc(50% - 5px); }
      :host.alternate {
        margin-left: calc(50% + 5px); }
      :host.mobile {
        width: calc(100% - 30px);
        margin-left: 30px; }
      :host .mgl-timeline-entry-card {
        background-color: #f0f0f0; }
        :host .mgl-timeline-entry-card .mgl-timeline-entry-card-header {
          position: relative;
          background-color: #e6e6e6; }
  `]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntryComponent.ctorParameters = () => [
    { type: ElementRef, },
];
MglTimelineEntryComponent.propDecorators = {
    'alternate': [{ type: HostBinding, args: ['class.alternate',] },],
    'mobile': [{ type: HostBinding, args: ['class.mobile',] },],
    'changed': [{ type: Output },],
    'animationDone': [{ type: Output },],
    'content': [{ type: ContentChild, args: [MglTimelineEntryContentComponent,] },],
    'header': [{ type: ContentChild, args: [MglTimelineEntryHeaderComponent,] },],
    'dot': [{ type: ContentChild, args: [MglTimelineEntryDotComponent,] },],
    'side': [{ type: ContentChild, args: [MglTimelineEntrySideComponent,] },],
};

class MglTimelineComponent {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.toggle = true;
        this.alternate = true;
        this._mobile = false;
        this._focusOnOpen = false;
        this.subscriptions = [];
    }
    /**
     * @param {?} mobile
     * @return {?}
     */
    set mobile(mobile) {
        if (mobile !== this._mobile) {
            this.content && this.content.forEach(entry => entry.mobile = mobile);
        }
        setTimeout(() => {
            // Prevent ExpressionChangedAfterItHasBeenCheckedError exception
            this._mobile = mobile;
        });
    }
    /**
     * @return {?}
     */
    get mobile() {
        return this._mobile;
    }
    /**
     * @param {?} focusOnOpen
     * @return {?}
     */
    set focusOnOpen(focusOnOpen) {
        this.content && this.content.forEach(entry => entry.focusOnOpen = focusOnOpen);
        this._focusOnOpen = focusOnOpen;
    }
    /**
     * @return {?}
     */
    get focusOnOpen() {
        return this._focusOnOpen;
    }
    /**
     * @param {?} simpleChanges
     * @return {?}
     */
    ngOnChanges(simpleChanges) {
        this.updateContent();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.mobile = this.elementRef.nativeElement.clientWidth < 640;
        setTimeout(() => this.updateContent());
        this.content.changes.subscribe(() => this.updateContent());
    }
    /**
     * @return {?}
     */
    updateContent() {
        this.ngOnDestroy();
        if (this.content) {
            this.content.forEach((entry, index) => {
                if (this.toggle) {
                    this.subscriptions.push(entry.changed.subscribe(state => {
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
    /**
     * @param {?} ev
     * @return {?}
     */
    onResize(ev) {
        this.mobile = this.elementRef.nativeElement.clientWidth < 640;
    }
}
MglTimelineComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline',
                template: `
    <div class="mgl-timeline-line"></div>
    <ng-content></ng-content>
  `,
                styles: [`
    /**
     * Applies styles for users in high contrast mode. Note that this only applies
     * to Microsoft browsers. Chrome can be included by checking for the \`html[hc]\`
     * attribute, however Chrome handles high contrast differently.
     */
    /* Theme for the ripple elements.*/
    /* stylelint-disable material/no-prefixes */
    /* stylelint-enable */
    :host {
      position: relative;
      display: block;
      padding: 50px 0; }
      :host .mgl-timeline-line {
        position: absolute;
        top: 0;
        height: 100%;
        background-color: #a0a0a0;
        left: 50%;
        width: 10px;
        -webkit-transform: translateX(-50%);
                transform: translateX(-50%); }
      :host.mobile .mgl-timeline-line {
        left: 20px;
        -webkit-transform: none;
                transform: none; }
  `]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineComponent.ctorParameters = () => [
    { type: ElementRef, },
];
MglTimelineComponent.propDecorators = {
    'toggle': [{ type: Input },],
    'alternate': [{ type: Input },],
    'mobile': [{ type: HostBinding, args: ['class.mobile',] },],
    'focusOnOpen': [{ type: Input },],
    'content': [{ type: ContentChildren, args: [MglTimelineEntryComponent,] },],
    'onResize': [{ type: HostListener, args: ['window:resize',] },],
};

class MglTimelineModule {
}
MglTimelineModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MglTimelineComponent,
                    MglTimelineEntryComponent,
                    MglTimelineEntryHeaderComponent,
                    MglTimelineEntrySideComponent,
                    MglTimelineEntryContentComponent,
                    MglTimelineEntryDotComponent
                ],
                exports: [
                    MglTimelineComponent,
                    MglTimelineEntryComponent,
                    MglTimelineEntryHeaderComponent,
                    MglTimelineEntrySideComponent,
                    MglTimelineEntryContentComponent,
                    MglTimelineEntryDotComponent
                ]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineModule.ctorParameters = () => [];

/**
 * Generated bundle index. Do not edit.
 */

export { MglTimelineModule, MglTimelineEntryContentComponent as ɵc, MglTimelineEntryDotComponent as ɵe, MglTimelineEntryHeaderComponent as ɵd, MglTimelineEntrySideComponent as ɵf, MglTimelineEntryComponent as ɵb, MglTimelineComponent as ɵa };
//# sourceMappingURL=angular-mgl-timeline.js.map
