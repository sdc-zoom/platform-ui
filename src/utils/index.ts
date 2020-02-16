import moment from "moment";
import server from "./server";

interface AnyObj {
  [prop: string]: any;
}

type PlatformRequestMethodTypes =
  | "post"
  | "POST"
  | "get"
  | "GET"
  | "put"
  | "PUT"
  | "delete"
  | "DELETE";

interface PlatformRequestParams {
  readonly url: string;
  readonly method?: PlatformRequestMethodTypes;
  readonly params?: any;
  readonly data?: any;
}

interface PlatformResponse {
  readonly success: boolean;
  readonly data: any;
  readonly message: string;
  readonly meta: AnyObj;
  readonly timestap: number;
}

/**
 * 日期格式化
 * @param date 日期
 * @param formatter 格式
 */
export function dateFormat(
  date: Date | string | number = new Date(),
  formatter: string = "YYYY-MM-DD"
): string {
  return moment(date, formatter) + "";
}

/**
 * 组件库统一接口请求方法
 * @param options
 */
export function request(
  options: PlatformRequestParams
): Promise<PlatformResponse> {
  return server(options);
}
