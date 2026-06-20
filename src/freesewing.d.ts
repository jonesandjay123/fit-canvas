// FreeSewing 套件沒有附帶型別宣告，這裡補上最小宣告讓 TS 通過。
declare module "@freesewing/aaron" {
  export class Aaron {
    constructor(settings?: Record<string, unknown>);
    draft(): { render(): string };
  }
}
