// 模式匹配

type p = Promise<1>;

// infer
type GetValueType<P> = P extends Promise<infer T> ? T : never;

type getValueResult = GetValueType<p>;

// 数组

type arr = [1, 2, 3]; // 提取第一个元素类型

type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;
type arrfirst = GetFirst<arr>;

// 提取最后一个元素类型
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;
type arrLast = GetLast<arr>;

// PopArr
type PopArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...infer R, unknown]
  ? R
  : never;
type PopList = PopArr<[]>;
type PopList2 = PopArr<[1, 2, 3]>;

// ShiftArr
type ShiftArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer R]
  ? R
  : never;
type ShiftArr1 = ShiftArr<[]>;
type ShiftArr2 = ShiftArr<[1, 2, 3]>;

// StartsWith
type StartsWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;
type StartsWith1 = StartsWith<"#ddd", "#">;
type StartsWith2 = StartsWith<"ddd", "#">;

// ReplaceStr
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;
type ReplaceStr1 = ReplaceStr<"你好?早上好", "?", "，">;

// TrimStrRight 递归去除右侧空白
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimStrRight<Rest>
  : Str;
type TrimStrRight1 = TrimStrRight<"hellow world  d  ">;

// TrimStrLeft 去除左侧
type TrimStrLeft<Str extends string> = Str extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimStrLeft<Rest>
  : Str;
type TrimStrLeft1 = TrimStrLeft<"  hellow world  d  ">;

// TrimStr 去除两侧空白
type TrimStr = TrimStrLeft<TrimStrRight<"     d .  ddddddd   ">>;

// TrimMidStr
type TrimMidStr<Str extends string> = Str extends `${infer L}${" "}${infer R}`
  ? TrimMidStr<`${L}${R}`>
  : Str;
type TrimMidStr1 = TrimMidStr<"3 .  dddd">;

type Trim = TrimMidStr<TrimStrLeft<TrimStrRight<"     d .  ddddddd   ">>>;
