# PlatformUI

## 中国电建集团成都勘测设计研究院有限公司数字工程分公司

### 研发中心平台前端组件库

---

## 安装

```bash
  npm i @chidi-sdc/platform-ui -S
```

## 使用

```javascript
import "@chidi-sdc/platform-ui/dist/platform-ui.min.css";
import PlatformUI from "@chidi-sdc/platform-ui";
```

## PlatformUI.PlTask

- props
  - taskId 字符串 任务 id
  - taskType 字符串 todo | done 任务表单类型
    - todo 表示是代办任务，会渲染右测的处理区域
    - done 表示已办任务，不会渲染右侧处理区域

* slot

  - 此组件提供有一个 slot 插槽，放入插槽的业务表单组件根据业务需要在业务表单组件 methods 中实现以下三个方法

    - 1、任务信息加载成功

      ```javascript
        // PlTask会调用此方法将任务信息传递给业务表单组件
        onTaskLoad(task) {
          this.task = task;
          console.log(this.task);
        }
      ```

    * 2、流程表单按钮点击之前
      ```javascript
        // PlTask在点击流程处理按钮之前会先调用此业务组件方法
        // 业务表单可以在此时处理业务系统的数据处理
        async beforeTaskButtonClick(button) {
          console.log("点击按钮前", button);
        }
      ```

    - 3、流程表单按钮点击之后
      ```javascript
        // PlTask在流程处理流程点击完成并拿到后台返回结果后会调用此方法
        async afterTaskButtonClick(button, result) {
          console.log("点击按钮后", button, result);
        }
      ```

  - 业务表单组件 test

    ```javascript
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
    ```

  - PlTask 使用示例

    ```javascript
      <template>
        <div class="demo-page">
          <div class="box">
            <pl-task :task-id="'677913593743671296'" :task-type="'done'">
              <test></test>
            </pl-task>
          </div>
        </div>
      </template>
      <script>
        import PlatformUI from "@chidi-sdc/platform-ui";
        import test from "./test";
        export default {
          name: "ApiTask",
          components: {
            PlTask : PlatformUI.PlTask,
            test
          },
          methods: {},
          data() {
            return {};
          }
        };
      </script>
    ```
