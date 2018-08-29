import { ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, HostBinding, HostListener, Input, NgModule, Output, Renderer } from '@angular/core';
import { AnimationBuilder, animate, style } from '@angular/animations';
var MglTimelineEntryHeaderComponent = /** @class */ (function () {
    function MglTimelineEntryHeaderComponent() {
    }
    return MglTimelineEntryHeaderComponent;
}());
MglTimelineEntryHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-header',
                template: "\n    <ng-content></ng-content>\n  ",
                styles: ["\n    :host {\n      position: relative;\n      display: block;\n      overflow: hidden;\n      padding: 15px;\n      text-align: center; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntryHeaderComponent.ctorParameters = function () { return []; };
var MglTimelineEntryDotComponent = /** @class */ (function () {
    /**
     * @param {?} animationBuilder
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} changeDetectorRef
     */
    function MglTimelineEntryDotComponent(animationBuilder, elementRef, renderer, changeDetectorRef) {
        this.animationBuilder = animationBuilder;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.changeDetectorRef = changeDetectorRef;
        this._expanded = false;
        this._alternate = false;
        this._mobile = false;
        this._size = 50;
        this.animationDone = new EventEmitter();
        this.clazz = 'primary';
    }
    Object.defineProperty(MglTimelineEntryDotComponent.prototype, "size", {
        /**
         * @return {?}
         */
        get: function () {
            return this._size;
        },
        /**
         * @param {?} size
         * @return {?}
         */
        set: function (size) {
            this._size = size;
            this.setStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MglTimelineEntryDotComponent.prototype, "alternate", {
        /**
         * @return {?}
         */
        get: function () {
            return this._alternate;
        },
        /**
         * @param {?} alternate
         * @return {?}
         */
        set: function (alternate) {
            this._alternate = alternate;
            this.setStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MglTimelineEntryDotComponent.prototype, "mobile", {
        /**
         * @return {?}
         */
        get: function () {
            return this._mobile;
        },
        /**
         * @param {?} mobile
         * @return {?}
         */
        set: function (mobile) {
            this._mobile = mobile;
            this.setStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MglTimelineEntryDotComponent.prototype, "expanded", {
        /**
         * @return {?}
         */
        get: function () {
            return this._expanded;
        },
        /**
         * @param {?} expanded
         * @return {?}
         */
        set: function (expanded) {
            var /** @type {?} */ animate$$1 = this._expanded !== expanded;
            this._expanded = expanded;
            animate$$1 ? this.animate() : this.setStyle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MglTimelineEntryDotComponent.prototype.ngAfterViewInit = function () {
        this.initialStyle = window.getComputedStyle(this.elementRef.nativeElement);
        this.setStyle();
        this.changeDetectorRef.detectChanges();
    };
    /**
     * @return {?}
     */
    MglTimelineEntryDotComponent.prototype.getCollapsedStyle = function () {
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
    };
    /**
     * @return {?}
     */
    MglTimelineEntryDotComponent.prototype.getTransitionStyle = function () {
        return Object.assign({}, this.getCollapsedStyle(), { left: '50%', opacity: 0.5, boxShadow: 'none' });
    };
    /**
     * @return {?}
     */
    MglTimelineEntryDotComponent.prototype.getExpandedStyle = function () {
        return Object.assign({}, this.getTransitionStyle(), { left: '0', transform: 'translateX(0) translateY(-50%)', width: '100%', height: '100%', opacity: 1, borderRadius: 0 });
    };
    /**
     * @return {?}
     */
    MglTimelineEntryDotComponent.prototype.animate = function () {
        var _this = this;
        this.destroyAnimation();
        if (this.expanded) {
            this.animation = this.animationBuilder
                .build([
                style(this.getCollapsedStyle()),
                animate('200ms ease', style(this.getTransitionStyle())),
                animate('200ms ease', style(this.getExpandedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            this.animation.onDone(function () { return _this.animationDone.emit({ toState: 'expanded' }); });
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
            this.animation.onDone(function () { return _this.animationDone.emit({ toState: 'collapsed' }); });
            this.animation.play();
        }
    };
    /**
     * @return {?}
     */
    MglTimelineEntryDotComponent.prototype.setStyle = function () {
        var _this = this;
        this.destroyAnimation();
        var /** @type {?} */ baseStyle = this.expanded ? this.getExpandedStyle() : this.getCollapsedStyle();
        Object.keys(baseStyle).forEach(function (property) {
            _this.renderer.setElementStyle(_this.elementRef.nativeElement, property, baseStyle[property]);
        });
    };
    /**
     * @return {?}
     */
    MglTimelineEntryDotComponent.prototype.destroyAnimation = function () {
        if (this.animation) {
            this.animation.destroy();
            delete this.animation;
        }
    };
    return MglTimelineEntryDotComponent;
}());
MglTimelineEntryDotComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-dot',
                template: "\n    <ng-content></ng-content>\n  ",
                styles: ["\n    :host {\n      display: block;\n      position: absolute; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntryDotComponent.ctorParameters = function () { return [
    { type: AnimationBuilder, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: ChangeDetectorRef, },
]; };
MglTimelineEntryDotComponent.propDecorators = {
    'clazz': [{ type: Input, args: ['class',] }, { type: HostBinding, args: ['class',] },],
    'size': [{ type: Input },],
};
var MglTimelineEntryContentComponent = /** @class */ (function () {
    /**
     * @param {?} elementRef
     * @param {?} animationBuilder
     * @param {?} renderer
     */
    function MglTimelineEntryContentComponent(elementRef, animationBuilder, renderer) {
        this.elementRef = elementRef;
        this.animationBuilder = animationBuilder;
        this.renderer = renderer;
        this.animationDone = new EventEmitter();
        this._expanded = false;
    }
    Object.defineProperty(MglTimelineEntryContentComponent.prototype, "expanded", {
        /**
         * @return {?}
         */
        get: function () {
            return this._expanded;
        },
        /**
         * @param {?} expanded
         * @return {?}
         */
        set: function (expanded) {
            this.contentHeight = this.elementRef.nativeElement.scrollHeight;
            var /** @type {?} */ animate$$1 = this._expanded !== expanded;
            this._expanded = expanded;
            animate$$1 ? this.animate() : this.setStyle;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MglTimelineEntryContentComponent.prototype.ngAfterViewInit = function () {
        this.contentHeight = this.elementRef.nativeElement.scrollHeight;
        this.setStyle();
    };
    /**
     * @return {?}
     */
    MglTimelineEntryContentComponent.prototype.getCollapsedStyle = function () {
        return {
            height: 0
        };
    };
    /**
     * @return {?}
     */
    MglTimelineEntryContentComponent.prototype.getExpandedStyle = function () {
        return {
            height: this.contentHeight + 'px'
        };
    };
    /**
     * @return {?}
     */
    MglTimelineEntryContentComponent.prototype.animate = function () {
        var _this = this;
        if (this.expanded) {
            var /** @type {?} */ animation = this.animationBuilder
                .build([
                style(this.getCollapsedStyle()),
                animate('100ms ease', style(this.getExpandedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            animation.onDone(function () { return _this.animationDone.emit({ toState: 'expanded' }); });
            animation.play();
        }
        else {
            this.animationBuilder;
            var /** @type {?} */ animation = this.animationBuilder
                .build([
                style(this.getExpandedStyle()),
                animate('200ms ease', style(this.getCollapsedStyle())),
            ])
                .create(this.elementRef.nativeElement);
            animation.onDone(function () { return _this.animationDone.emit({ toState: 'collapsed' }); });
            animation.play();
        }
    };
    /**
     * @return {?}
     */
    MglTimelineEntryContentComponent.prototype.setStyle = function () {
        var _this = this;
        var /** @type {?} */ baseStyle = this.expanded ? this.getExpandedStyle() : this.getCollapsedStyle();
        Object.keys(baseStyle).forEach(function (property) {
            _this.renderer.setElementStyle(_this.elementRef.nativeElement, property, baseStyle[property]);
        });
    };
    return MglTimelineEntryContentComponent;
}());
MglTimelineEntryContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-content',
                template: "\n    <div><ng-content></ng-content></div>\n  ",
                styles: ["\n    :host {\n      position: relative;\n      display: block;\n      overflow: hidden; }\n      :host > div {\n        padding: 10px; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntryContentComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: AnimationBuilder, },
    { type: Renderer, },
]; };
var MglTimelineEntrySideComponent = /** @class */ (function () {
    /**
     * @param {?} elementRef
     */
    function MglTimelineEntrySideComponent(elementRef) {
        this.elementRef = elementRef;
    }
    Object.defineProperty(MglTimelineEntrySideComponent.prototype, "alternate", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.elementRef.nativeElement.classList.toggle('alternate', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MglTimelineEntrySideComponent.prototype, "mobile", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.elementRef.nativeElement.classList.toggle('mobile', value);
        },
        enumerable: true,
        configurable: true
    });
    return MglTimelineEntrySideComponent;
}());
MglTimelineEntrySideComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry-side',
                template: "\n    <ng-content></ng-content>\n  ",
                styles: ["\n    :host {\n      position: absolute;\n      top: 0;\n      left: 100%;\n      width: 100%;\n      text-align: center; }\n      :host.alternate {\n        left: -100%; }\n      :host.mobile {\n        display: none; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntrySideComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
var MglTimelineEntryComponent = /** @class */ (function () {
    /**
     * @param {?} elementRef
     */
    function MglTimelineEntryComponent(elementRef) {
        this.elementRef = elementRef;
        this.subscriptions = [];
        this.focusOnOpen = false;
        this._mobile = false;
        this.changed = new EventEmitter();
        this.animationDone = new EventEmitter();
    }
    Object.defineProperty(MglTimelineEntryComponent.prototype, "expanded", {
        /**
         * @return {?}
         */
        get: function () {
            return this.dot ? (this.dot.expanded && this.content.expanded) : this.content.expanded;
        },
        /**
         * @param {?} expanded
         * @return {?}
         */
        set: function (expanded) {
            if (this.dot && expanded) {
                this.dot.expanded = expanded;
            }
            else {
                this.content.expanded = expanded;
            }
            this.changed.emit(expanded);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MglTimelineEntryComponent.prototype, "mobile", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.elementRef.nativeElement.classList.toggle('mobile', value);
            if (this.dot) {
                this.dot.mobile = value;
            }
            if (this.side) {
                this.side.mobile = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MglTimelineEntryComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.dot) {
            this.subscriptions.push(this.dot.animationDone.subscribe(function (event) {
                if (event.toState === 'expanded') {
                    _this.content.expanded = true;
                }
                else {
                    _this.animationDone.emit(event);
                }
            }));
        }
        if (this.content) {
            this.subscriptions.push(this.content.animationDone.subscribe(function (event) {
                if (_this.dot && event.toState === 'collapsed') {
                    _this.dot.expanded = false;
                }
                else {
                    if (_this.focusOnOpen) {
                        _this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    _this.animationDone.emit(event);
                }
            }));
        }
    };
    Object.defineProperty(MglTimelineEntryComponent.prototype, "alternate", {
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            if (this.position) {
                value = this.position === 'right';
            }
            this.elementRef.nativeElement.classList.toggle('alternate', value);
            if (this.dot) {
                this.dot.alternate = value;
            }
            if (this.side) {
                this.side.alternate = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MglTimelineEntryComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    MglTimelineEntryComponent.prototype.collapse = function () {
        this.expanded = false;
    };
    /**
     * @return {?}
     */
    MglTimelineEntryComponent.prototype.expand = function () {
        this.expanded = true;
    };
    /**
     * @return {?}
     */
    MglTimelineEntryComponent.prototype.toggle = function () {
        this.expanded = !this.expanded;
    };
    return MglTimelineEntryComponent;
}());
MglTimelineEntryComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline-entry',
                template: "\n    <ng-content select=\"mgl-timeline-entry-side\"></ng-content>\n    <div class=\"mgl-timeline-entry-card\">\n      <div class=\"mgl-timeline-entry-card-header\" (click)=\"toggle()\">\n        <ng-content select=\"mgl-timeline-entry-dot\"></ng-content>\n        <ng-content select=\"mgl-timeline-entry-header\"></ng-content>\n      </div>\n      <ng-content select=\"mgl-timeline-entry-content\"></ng-content>\n    </div>\n  ",
                styles: ["\n    /**\n     * Applies styles for users in high contrast mode. Note that this only applies\n     * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n     * attribute, however Chrome handles high contrast differently.\n     */\n    /* Theme for the ripple elements.*/\n    /* stylelint-disable material/no-prefixes */\n    /* stylelint-enable */\n    :host {\n      display: block;\n      position: relative;\n      margin-bottom: 50px;\n      width: calc(50% - 5px); }\n      :host.alternate {\n        margin-left: calc(50% + 5px); }\n      :host.mobile {\n        width: calc(100% - 30px);\n        margin-left: 30px; }\n      :host .mgl-timeline-entry-card {\n        background-color: #f0f0f0; }\n        :host .mgl-timeline-entry-card .mgl-timeline-entry-card-header {\n          position: relative;\n          background-color: #e6e6e6; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineEntryComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
MglTimelineEntryComponent.propDecorators = {
    'position': [{ type: Input },],
    'changed': [{ type: Output },],
    'animationDone': [{ type: Output },],
    'content': [{ type: ContentChild, args: [MglTimelineEntryContentComponent,] },],
    'header': [{ type: ContentChild, args: [MglTimelineEntryHeaderComponent,] },],
    'dot': [{ type: ContentChild, args: [MglTimelineEntryDotComponent,] },],
    'side': [{ type: ContentChild, args: [MglTimelineEntrySideComponent,] },],
};
var MglTimelineComponent = /** @class */ (function () {
    /**
     * @param {?} elementRef
     * @param {?} changeDetectorRef
     */
    function MglTimelineComponent(elementRef, changeDetectorRef) {
        this.elementRef = elementRef;
        this.changeDetectorRef = changeDetectorRef;
        this.toggle = true;
        this.alternate = true;
        this.start = 'left';
        this._focusOnOpen = false;
        this.subscriptions = [];
    }
    Object.defineProperty(MglTimelineComponent.prototype, "mobile", {
        /**
         * @return {?}
         */
        get: function () {
            return this.elementRef.nativeElement.classList.contains('mobile');
        },
        /**
         * @param {?} value
         * @return {?}
         */
        set: function (value) {
            this.content && this.content.forEach(function (entry) { return entry.mobile = value; });
            this.elementRef.nativeElement.classList.toggle('mobile', value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MglTimelineComponent.prototype, "focusOnOpen", {
        /**
         * @return {?}
         */
        get: function () {
            return this._focusOnOpen;
        },
        /**
         * @param {?} focusOnOpen
         * @return {?}
         */
        set: function (focusOnOpen) {
            this.content && this.content.forEach(function (entry) { return entry.focusOnOpen = focusOnOpen; });
            this._focusOnOpen = focusOnOpen;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} simpleChanges
     * @return {?}
     */
    MglTimelineComponent.prototype.ngOnChanges = function (simpleChanges) {
        this.updateContent();
    };
    /**
     * @return {?}
     */
    MglTimelineComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    /**
     * @return {?}
     */
    MglTimelineComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.mobile = this.elementRef.nativeElement.clientWidth < 640;
        setTimeout(function () { return _this.updateContent(); });
        this.content.changes.subscribe(function (changes) {
            _this.updateContent();
        });
    };
    /**
     * @return {?}
     */
    MglTimelineComponent.prototype.updateContent = function () {
        var _this = this;
        this.ngOnDestroy();
        if (this.content) {
            this.content.forEach(function (entry, index) {
                if (_this.toggle) {
                    _this.subscriptions.push(entry.changed.subscribe(function (state) {
                        if (state === true) {
                            _this.content.filter(function (e) { return e !== entry; }).forEach(function (e) { return e.collapse(); });
                        }
                    }));
                }
                entry.alternate = _this.alternate ? index % 2 !== (_this.start === 'left' ? 0 : 1) : false;
                entry.mobile = _this.mobile;
                entry.focusOnOpen = _this.focusOnOpen;
            });
        }
    };
    /**
     * @param {?} ev
     * @return {?}
     */
    MglTimelineComponent.prototype.onResize = function (ev) {
        this.mobile = this.elementRef.nativeElement.clientWidth < 640;
    };
    return MglTimelineComponent;
}());
MglTimelineComponent.decorators = [
    { type: Component, args: [{
                selector: 'mgl-timeline',
                template: "\n    <div class=\"mgl-timeline-line\"></div>\n    <ng-content></ng-content>\n  ",
                styles: ["\n    /**\n     * Applies styles for users in high contrast mode. Note that this only applies\n     * to Microsoft browsers. Chrome can be included by checking for the `html[hc]`\n     * attribute, however Chrome handles high contrast differently.\n     */\n    /* Theme for the ripple elements.*/\n    /* stylelint-disable material/no-prefixes */\n    /* stylelint-enable */\n    :host {\n      position: relative;\n      display: block;\n      padding: 50px 0; }\n      :host .mgl-timeline-line {\n        position: absolute;\n        top: 0;\n        height: 100%;\n        background-color: #a0a0a0;\n        left: 50%;\n        width: 10px;\n        -webkit-transform: translateX(-50%);\n                transform: translateX(-50%); }\n      :host.mobile .mgl-timeline-line {\n        left: 20px;\n        -webkit-transform: none;\n                transform: none; }\n  "]
            },] },
];
/**
 * @nocollapse
 */
MglTimelineComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
]; };
MglTimelineComponent.propDecorators = {
    'toggle': [{ type: Input },],
    'alternate': [{ type: Input },],
    'start': [{ type: Input },],
    'focusOnOpen': [{ type: Input },],
    'content': [{ type: ContentChildren, args: [MglTimelineEntryComponent,] },],
    'onResize': [{ type: HostListener, args: ['window:resize',] },],
};
var MglTimelineModule = /** @class */ (function () {
    function MglTimelineModule() {
    }
    return MglTimelineModule;
}());
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
MglTimelineModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */
export { MglTimelineModule, MglTimelineEntryContentComponent as ɵc, MglTimelineEntryDotComponent as ɵe, MglTimelineEntryHeaderComponent as ɵd, MglTimelineEntrySideComponent as ɵf, MglTimelineEntryComponent as ɵb, MglTimelineComponent as ɵa };
//# sourceMappingURL=angular-mgl-timeline.es5.js.map
