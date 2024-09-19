import { Module, forwardRef } from '@nestjs/common'

import { HandleInstanceConnected } from '@/domain/management/application/handlers/handle-instance-connected'
import { HandleInstanceDisconnected } from '@/domain/management/application/handlers/handle-instance-disconnected'
import { HandleInstanceFailed } from '@/domain/management/application/handlers/handle-instance-failed'
import { HandleInstanceInitialized } from '@/domain/management/application/handlers/handle-instance-initialized'
import { HandleInstanceQRCodeChange } from '@/domain/management/application/handlers/handle-instance-qr-code-change'
import { HandleInstanceStarting } from '@/domain/management/application/handlers/handle-instance-starting'
import { HandleInstanceStopped } from '@/domain/management/application/handlers/handle-instance-stopped'
import { WWJSModule } from '../../wwjs.module'
import { WWJSHandleClientConnected } from './wwjs-handle-client-connected'
import { WWJSHandleClientDisconnected } from './wwjs-handle-client-disconnected'
import { WWJSHandleClientFailed } from './wwjs-handle-client-failed'
import { WWJSHandleClientInitialized } from './wwjs-handle-client-initialized'
import { WWJSHandleClientQRCodeChange } from './wwjs-handle-client-qr-code-change'
import { WWJSHandleClientStarting } from './wwjs-handle-client-starting'
import { WWJSHandleClientStopped } from './wwjs-handle-client-stopped'

@Module({
  imports: [forwardRef(() => WWJSModule)],
  providers: [
    WWJSHandleClientConnected,
    HandleInstanceConnected,

    WWJSHandleClientDisconnected,
    HandleInstanceDisconnected,

    WWJSHandleClientFailed,
    HandleInstanceFailed,

    WWJSHandleClientInitialized,
    HandleInstanceInitialized,

    WWJSHandleClientStarting,
    HandleInstanceStarting,

    WWJSHandleClientQRCodeChange,
    HandleInstanceQRCodeChange,

    WWJSHandleClientStopped,
    HandleInstanceStopped,
  ],
  exports: [
    WWJSHandleClientConnected,
    WWJSHandleClientDisconnected,
    WWJSHandleClientFailed,
    WWJSHandleClientInitialized,
    WWJSHandleClientQRCodeChange,
    WWJSHandleClientStopped,
    WWJSHandleClientStarting,
  ],
})
export class WWJSHandlersModule {}
