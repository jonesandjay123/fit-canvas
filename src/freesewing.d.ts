// FreeSewing 套件沒有附帶型別宣告，這裡補上最小宣告讓 TS 通過。
// 每個 design 都是一個 class，建構後 draft().render() 回傳 SVG 字串。
declare module "@freesewing/aaron" {
  export class Aaron {
    constructor(settings?: Record<string, unknown>);
    draft(): { render(): string };
  }
}
declare module "@freesewing/teagan" {
  export class Teagan {
    constructor(settings?: Record<string, unknown>);
    draft(): { render(): string };
  }
}
declare module "@freesewing/sven" {
  export class Sven {
    constructor(settings?: Record<string, unknown>);
    draft(): { render(): string };
  }
}
declare module "@freesewing/waralee" {
  export class Waralee {
    constructor(settings?: Record<string, unknown>);
    draft(): { render(): string };
  }
}
declare module "@freesewing/trayvon" {
  export class Trayvon {
    constructor(settings?: Record<string, unknown>);
    draft(): { render(): string };
  }
}
