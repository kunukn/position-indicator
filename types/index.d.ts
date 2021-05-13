export declare type updateType = 'init' | 'scroll' | 'resize' | 'heightChange';
export interface UpdateParams {
    position: number;
    updateType: updateType;
    hasScroll: boolean;
    lastUpdated: number;
}
export interface Options {
    onInit: (data: UpdateParams) => {} | void;
    onUpdate: (data: UpdateParams) => {} | void;
}
export declare const createPositionIndicator: (options: Options) => {
    hasScroll: () => boolean;
    getFullDocumentHeight: () => number;
    getViewPortHeight: () => number;
    getScrollYPosition: () => number;
    init: () => void;
    destroy: () => void;
};
//# sourceMappingURL=index.d.ts.map