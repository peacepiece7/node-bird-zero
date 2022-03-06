import { enableAllPlugins, produce } from "immer";

export default (...args) => {
  enableAllPlugins();
  return produce(...args);
};
