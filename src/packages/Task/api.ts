import { request } from "@/utils";

/**
 * 获取任务信息
 * @param {*} taskId
 */
export function getTaskInfo(taskId: string) {
  return request({
    url: `/api/system/tasks/${taskId}/auth`
  });
}

/**
 * 获取任务日志信息
 * @param {*} taskId
 */
export function getTaskLogs(taskId: string) {
  return request({
    url: `/api/system/tasks/${taskId}/logs`
  });
}

/**
 * 获取任务流程图
 * @param {*} taskId
 */
export function getTaskImage(taskId: string) {
  return request({
    url: `/api/system/tasks/${taskId}/image/jpeg`
  });
}

/**
 * 获取任务按钮
 * @param {*} taskId
 */
export function getTaskButtons(taskId: string) {
  return request({
    url: `/api/system/tasks/${taskId}/forms`
  });
}

/**
 * 处理任务
 * @param {*} taskId
 */
export function doneTask(taskId: string, data: any) {
  return request({
    url: `/api/system/tasks/${taskId}/process`,
    method: "post",
    data
  });
}
