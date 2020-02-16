import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export const routes = [
  {
    path: "/",
    redirect: "/api/kaptcha"
  },
  {
    path: "/api/kaptcha",
    component: () => import("ex/views/kaptcha/index.vue"),
    name: "api-kaptcha",
    meta: {
      name: "验证码组件"
    }
  },
  {
    path: "/api/task",
    component: () => import("ex/views/task/index.vue"),
    name: "api-task",
    meta: {
      name: "流程表单"
    }
  }
];

export default new Router({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  }
});
