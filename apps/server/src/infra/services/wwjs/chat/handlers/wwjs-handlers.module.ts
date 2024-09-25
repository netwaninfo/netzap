import { Module, forwardRef } from '@nestjs/common'
import { WWJSModule } from '../../wwjs.module'
import { WWJSHandleMessageReceived } from './wwjs-handle-message-received'

@Module({
  imports: [forwardRef(() => WWJSModule)],
  providers: [WWJSHandleMessageReceived],
  exports: [WWJSHandleMessageReceived],
})
export class WWJSHandlersModule {}
