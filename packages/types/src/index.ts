import type { NeuroPilotAPI } from '@vsc-neuropilot/api-types';

export interface NeuroPilotCoreAPI {
    /**
     * The runtime API version.
     */
    version: string;
    getInterface(type: APITypes.BRIDGE): {};
    getInterface(type: APITypes.OBSERVER): {};
    getInterface(type: APITypes.COMPANION): NeuroPilotAPI;
}

export const enum APITypes {
    BRIDGE = 'bridge',
    OBSERVER = 'observer',
    COMPANION = 'companions',
}
