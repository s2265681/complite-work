import { createContainer } from "react-reconciler/src/ReactFierReconciler";
export function createRoot(container) {
  const root = createContainer(container);
  return new ReactDOMRoot(root);
}
