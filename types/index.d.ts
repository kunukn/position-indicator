export declare type eventType = 'init' | 'scroll' | 'resize' | 'heightChange';
export interface Memory {
    prevPosition?: number | null;
}
export interface UpdateParams {
    position: number;
    prevPosition: number;
    hasUpdated: boolean;
    eventType: eventType;
    hasScroll: boolean;
    eventDate: number;
}
export interface PositionIndicatorInstance {
    init: () => void;
    destroy: () => void;
}
export interface Options {
    onInit: (data: UpdateParams) => {} | void;
    onUpdate: (data: UpdateParams) => {} | void;
    useResizeListener: boolean;
    useResizeObserver: boolean;
}
export declare const createPositionIndicator: (options: Options) => PositionIndicatorInstance;
//# sourceMappingURL=index.d.ts.map