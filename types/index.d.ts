export declare type updateEvent = 'init' | 'scroll' | 'resize' | 'heightChange';
export interface Memory {
    prevPosition?: number | null;
}
export interface UpdateParams {
    position: number;
    prevPosition: number;
    hasUpdated: boolean;
    updateEvent: updateEvent;
    hasScroll: boolean;
    lastUpdated: number;
}
export interface PositionIndicatorInstance {
    init: () => void;
    destroy: () => void;
}
export interface Options {
    onInit: (data: UpdateParams) => {} | void;
    onUpdate: (data: UpdateParams) => {} | void;
}
export declare const createPositionIndicator: (options: Options) => PositionIndicatorInstance;
//# sourceMappingURL=index.d.ts.map