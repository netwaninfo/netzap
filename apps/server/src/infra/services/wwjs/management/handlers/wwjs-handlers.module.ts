import { Module, forwardRef } from '@nestjs/common'

import { HandleInstanceConnected } from '@/domain/management/application/handlers/handle-instance-connected.js'
import { HandleInstanceDisconnected } from '@/domain/management/application/handlers/handle-instance-disconnected.js'
import { HandleInstanceFailed } from '@/domain/management/application/handlers/handle-instance-failed.js'
import { HandleInstanceInitialized } from '@/domain/management/application/handlers/handle-instance-initialized.js'
import { HandleInstanceQRCodeChange } from '@/domain/management/application/handlers/handle-instance-qr-code-change.js'
import { HandleInstanceStarting } from '@/domain/management/application/handlers/handle-instance-starting.js'
import { HandleInstanceStopped } from '@/domain/management/application/handlers/handle-instance-stopped.js'
import { WWJSModule } from '../../wwjs.module.js'
import { WWJSHandleClientConnected } from './wwjs-handle-client-connected.js'
import { WWJSHandleClientDisconnected } from './wwjs-handle-client-disconnected.js'
import { WWJSHandleClientFailed } from './wwjs-handle-client-failed.js'
import { WWJSHandleClientInitialized } from './wwjs-handle-client-initialized.js'
import { WWJSHandleClientQRCodeChange } from './wwjs-handle-client-qr-code-change.js'
import { WWJSHandleClientStarting } from './wwjs-handle-client-starting.js'
import { WWJSHandleClientStopped } from './wwjs-handle-client-stopped.js'

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
