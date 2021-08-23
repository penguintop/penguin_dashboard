/// <reference types="react-scripts" />

interface LatestBeeRelease {
  name: string
  html_url: string
}

interface StatusHookCommon {
  isLoading: boolean
  isOk: boolean
}

interface StatusNodeVersionHook extends StatusHookCommon {
  userVersion?: string
  latestVersion?: string
  latestUrl: string
  isLatestBeeVersion: boolean
}
interface StatusEthereumConnectionHook extends StatusHookCommon {
  nodeAddresses: NodeAddresses | null
}
interface StatusTopologyHook extends StatusHookCommon {
  topology: Topology | null
}

declare module 'elliptic';

declare module 'ws';

declare module 'axios/lib/utils';

declare module 'axios/lib/helpers/normalizeHeaderName';

declare module 'tar-js';