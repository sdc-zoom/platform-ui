<template>
  <div class="form-test">
    <h1>这里是动态表单组件</h1>
  </div>
</template>
<script>
export default {
  name: "FormTest",
  methods: {
    async beforeTaskButtonClick(button) {
      console.log("点击按钮前", button);
    },

    async afterTaskButtonClick(button, result) {
      console.log("点击按钮后", button, result);
    },
    onTaskLoad(task) {
      this.task = task;
      console.log(this.task);
    }
  },
  data() {
    return {
      task: {}
    };
  }
};
</script>
<style lang="scss" scoped></style>
