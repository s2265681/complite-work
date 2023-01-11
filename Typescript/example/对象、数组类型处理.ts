export type rankDataKey = "creator" | "live" | "product" | "shop" | "video";

export type rankData = Record<
  rankDataKey,
  {
    status: number;
    items: [];
  }
>;

interface Obj {
  key: number;
}

type Readonly<T> = { readonly [P in keyof T]: T[P] };
type O1 = Readonly<Obj>;

type O2 = {
  readonly [P in keyof Obj]: Obj[P];
};
