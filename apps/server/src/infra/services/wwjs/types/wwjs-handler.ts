import { WWJSClient } from '../wwjs-client'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type WWJSListener = (...args: any[]) => Promise<void>

export abstract class WWJSHandler {
  abstract register(waClient: WWJSClient): WWJSListener
}
