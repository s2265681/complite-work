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
