<template>
  <div class="pl-task">
    <div class="pl-task-main" :style="taskStyle">
      <el-tabs v-model="activeName" type="border-card" size="small">
        <el-tab-pane label="任务信息" name="task">
          <div class="topic" v-text="task.taskName || '任务名称'"></div>
          <div class="business-form">
            <slot />
          </div>
          <div class="topic">任务日志</div>
          <div class="task-logs">
            <div class="no-img-tip" v-if="logs.length === 0">
              无任务处理日志信息
            </div>
            <div class="log-list" v-else>
              <div class="log-item" v-for="log in logs" :key="log.logId">
                <div
                  class="line1"
                  v-text="'处理人：' + log.createUserName"
                ></div>
                <div
                  class="line1"
                  v-text="'处理时间：' + dateFormat(log.createTime)"
                ></div>
                <div
                  class="line1"
                  v-text="'处理内容：' + log.noticeContent"
                ></div>
                <div
                  class="line1"
                  v-text="
                    '处理意见：' + (log.doneOption ? log.doneOption : '无')
                  "
                ></div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="任务流程" name="img">
          <div class="no-img-tip" v-if="!taskImg || taskImg === ''">
            无任务流程图信息
          </div>
          <img class="task-img" v-else :src="taskImg" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="pl-task-done" v-if="taskType === 'todo'">
      <el-input
        type="textarea"
        resize="none"
        placeholder="处理意见"
        rows="4"
        v-model="option"
      ></el-input>
      <div class="pl-task-buttons">
        <el-button
          size="small"
          v-for="(button, index) in buttons"
          :key="index"
          v-text="button.name"
          :type="index === 0 ? 'primary' : 'default'"
          @click="doneTask(button)"
        ></el-button>
      </div>
    </div>
    <div class="cl"></div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Tabs, TabPane, Button, Input } from "element-ui";
import {
  getTaskInfo,
  getTaskLogs,
  getTaskImage,
  getTaskButtons,
  doneTask
} from "./api";
import { dateFormat } from "@/utils";
@Component({
  name: "PlTask",
  components: {
    ElTabs: Tabs,
    ElTabPane: TabPane,
    ElButton: Button,
    ElInput: Input
  }
})
export default class PlTask extends Vue {
  private activeName: string = "task";
  private task: any = {};
  private logs: Array<any> = [];
  private taskImg: string = "";
  private buttons: Array<any> = [];
  private taskObjFormId: string = "";
  private option: string = "";

  @Prop({
    required: true
  })
  private taskId!: string;

  @Prop({
    default: "todo"
  })
  private taskType!: string;

  async doneTask(button: any) {
    if (this.$slots && this.$slots.default) {
      const inst: any = this.$slots.default[0].componentInstance;
      if (inst.beforeTaskButtonClick) {
        await inst.beforeTaskButtonClick({
          id: button.id,
          name: button.name,
          submitBizForm: button.submitBizForm,
          callBackParams: {
            ...button.callBackParams
          }
        });
      }
    }

    const { success, message, data } = await doneTask(this.taskId, {
      callBackParams: button.callBackParams,
      option: this.option,
      nextProcUserIds: {},
      attId: null
    });

    if (this.$slots && this.$slots.default) {
      const inst: any = this.$slots.default[0].componentInstance;
      if (inst.afterTaskButtonClick) {
        await inst.afterTaskButtonClick(
          {
            id: button.id,
            name: button.name,
            submitBizForm: button.submitBizForm,
            callBackParams: {
              ...button.callBackParams
            }
          },
          {
            success,
            message,
            data
          }
        );
      }
    }
  }

  dateFormat(date: string) {
    return dateFormat(date, "YYYY-MM-DD HH:mm:ss");
  }

  async getTaskInfo() {
    try {
      const { success, message, data } = await getTaskInfo(this.taskId);
      if (!success) return console.error(message);
      this.task = data;
      if (this.$slots && this.$slots.default) {
        const inst: any = this.$slots.default[0].componentInstance;
        if (inst.onTaskLoad) {
          inst.onTaskLoad(data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getTaskButtons() {
    try {
      const { success, message, data } = await getTaskButtons(this.taskId);
      if (!success) return console.error(message);
      this.buttons = data[0].buttons;
      this.taskObjFormId = data[0].taskObjFormId;
    } catch (error) {
      console.error(error);
    }
  }

  async getTaskLogs() {
    try {
      const { success, message, data } = await getTaskLogs(this.taskId);
      if (!success) return console.error(message);
      this.logs = data;
    } catch (error) {
      console.error(error);
    }
  }

  async getTaskImage() {
    try {
      const { success, message, data } = await getTaskImage(this.taskId);
      if (!success) return console.error(message);
      this.taskImg = data;
    } catch (error) {
      console.error(error);
    }
  }

  get taskStyle() {
    return {
      width: this.taskType === "todo" ? "calc(100% - 335px)" : "100%"
    };
  }

  @Watch("taskId", { immediate: true })
  taskIdHandler(newValue: string) {
    if (!newValue || newValue === "") return;
    this.getTaskInfo();
    this.getTaskLogs();
    this.getTaskImage();
    if (this.taskType === "todo") {
      this.getTaskButtons();
    }
  }
}
</script>
<style lang="scss" scoped>
.pl-task {
  text-align: left;
  width: 100%;
  height: 100%;
  .pl-task-main {
    width: calc(100% - 335px);
    float: left;
    height: 100%;
    box-sizing: border-box;
    .topic {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dcdfe6;
      font-size: 14px;
      color: #909399;
    }
    .business-form {
      margin: 15px 0;
      min-height: 100px;
    }

    .task-logs {
      margin-top: 10px;
      .log-item {
        padding: 5px 0;
        border-bottom: 1px dashed #dcdfe6;
        .line1 {
          span {
            margin-right: 20px;
          }
          margin-bottom: 5px;
        }
        &:first-child {
          padding-top: 0;
        }
      }
    }
  }
  .pl-task-done {
    width: 315px;
    float: left;
    height: 100%;
    margin-left: 20px;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.01);
    padding: 10px;
    .el-textarea {
      margin-bottom: 20px;
    }
    .pl-task-buttons {
      text-align: right;
    }
  }
  .no-img-tip {
    text-align: center;
    color: #d3d3d3;
    margin-top: 30px;
    font-size: 14px;
    margin-bottom: 30px;
  }
  .task-img {
    width: 100%;
  }
  .cl {
    clear: both;
  }
}
</style>

<style lang="scss">
.pl-task {
  .el-tabs {
    height: 100%;
    box-sizing: border-box;
    .el-tabs__content {
      height: calc(100% - 40px);
      padding: 10px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.01);
      overflow: auto;
    }
  }
  .el-textarea__inner {
    padding: 10px;
    font-size: 12px;
  }
}
</style>
