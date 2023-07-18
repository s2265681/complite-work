type MainLabelProp = {
  fontsize: string;
  fontweight: string;
  letterSpacing: string;
  rotate: number;
};

type Key = keyof MainLabelProp;

const obj: MainLabelProp = {
  fontsize: "string",
  fontweight: "string",
  letterSpacing: "string",
  rotate: 1,
};

function fun<K extends Key>(k: K, v: MainLabelProp[K]) {
  obj[k] = v;
}

fun("rotate", 1);
