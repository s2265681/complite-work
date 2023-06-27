// 剔除联合类型中的boolean

type name = number | string | boolean;

type OmitBoolean<unit> = unit extends boolean ? string | number : never;

type name2 = OmitBoolean<name>;

type nameS = number | string | boolean;

type nameS2 = Exclude<name, boolean>;

type Exclude1<T, U> = T extends U ? never : T;
type name3 = Exclude1<name, boolean>;
