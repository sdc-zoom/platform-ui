<template>
  <div class="demo-page">
    <div class="box">
      <pl-task :task-id="'677933121466793984'" :task-type="'done'">
        <test></test>
      </pl-task>
    </div>
  </div>
</template>
<script>
import test from "./test";
export default {
  name: "ApiTask",
  components: {
    test
  },
  methods: {},
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.demo-page {
  .box {
    margin: 30px;
    width: 1100px;
    height: 690px;
  }
}
</style>
