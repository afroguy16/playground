export type CSSStyleSheetExtended = CSSStyleSheet & {
    replace?: (a: string) => void;
}

export type ShadowRootExtended = ShadowRoot & {
    adoptedStyleSheets: CSSStyleSheetExtended[]
}