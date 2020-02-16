import "element-ui/lib/theme-chalk/index.css";
import PlTask from "@/packages/Task/index.vue";
import { VueConstructor } from "vue/types/umd";

const components: { [prop: string]: VueConstructor<Vue> } = {
  PlTask
};

const install = (Vue: VueConstructor) => {
  for (const c in components) {
    Vue.component(c, components[c]);
  }
};

export default {
  version: "1.0.0",
  install,
  PlTask
};
