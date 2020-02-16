<template>
  <div id="app">
    <div class="topic">Platform-UI</div>
    <div class="bottom">
      <div class="item nav">
        <ul style="margin-top:10px;">
          <li
            v-for="(item, index) in menuList"
            :key="index"
            v-text="item.name"
            :class="menuClass(item)"
            @click="goDemo(item)"
          ></li>
        </ul>
      </div>
      <div class="item router">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "ex/utils";
export default {
  name: "app",
  components: {},
  methods: {
    menuClass(item) {
      return {
        "current-menu": item.path === this.$route.path
      };
    },
    goDemo(item) {
      this.$router.push({
        path: item.path
      });
    }
  },
  async mounted() {
    await login("test", "123456");
    const menuList = [];
    this.$router.options.routes.map(d => {
      if (d.path !== "/") {
        menuList.push({
          path: d.path,
          name: d.meta.name
        });
      }
    });
    this.menuList = menuList;
  },
  data() {
    return {
      menuList: []
    };
  }
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .topic {
    height: 60px;
    font-size: 20px;
    line-height: 60px;
    font-weight: 600;
    padding-left: 20px;
    border-bottom: 1px solid #eaecef;
    box-sizing: border-box;
  }
  .bottom {
    height: calc(100% - 60px);
    overflow: hidden;
    display: flex;
    .item {
      height: 100%;
      &.nav {
        width: 320px;
        box-sizing: border-box;
        border-right: 1px solid #eaecef;
        overflow-y: auto;
        ul {
          li {
            height: 32px;
            line-height: 32px;
            font-size: 15px;
            padding-left: 20px;
            border-left: 4px solid transparent;
            cursor: pointer;
            transition: all 0.3s ease;
            &.current-menu {
              color: #3eaf7c;
              border-left-color: #3eaf7c;
              font-weight: bold;
            }
          }
        }
      }
      &.router {
        width: calc(100% - 320px);
        overflow: auto;
      }
    }
  }
}
</style>

<style lang="scss">
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 12px;
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      li {
        margin: 0;
        padding: 0;
        list-style: none;
      }
    }
  }
}
</style>
