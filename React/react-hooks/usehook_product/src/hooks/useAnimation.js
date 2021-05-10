import { useState } from "react";
function useAnimate(baseClassName, activeClassName) {
  let [className, setClassName] = useState(baseClassName);
  const toggle = () => {
    if (className === baseClassName) {
      setClassName(`${baseClassName} ${activeClassName}`);
    } else {
      setClassName(`${baseClassName}`);
    }
  };
  return [className, toggle];
}

export default useAnimate;
