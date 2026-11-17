declare module "page-flip" {
  export class PageFlip {
    constructor(element: HTMLElement, settings: Record<string, unknown>);
    loadFromImages(images: string[]): void;
    on(event: string, callback: (event: { data: number }) => void): void;
    flipNext(corner?: string): void;
    flipPrev(corner?: string): void;
    destroy(): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
  }
}
