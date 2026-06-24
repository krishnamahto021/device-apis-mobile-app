import * as Network from 'expo-network';

export const NETWORK_EVENT_LIMIT = 5;

export const networkCopy = {
  header: {
    title: 'Network',
    subtitle: '接続状態を見る',
  },
  status: {
    liveLabel: 'Live status',
    type: 'Type',
    connected: 'Connected',
    internet: 'Internet reachable',
    snapshot: 'Snapshot',
    ip: 'IP address',
    flightMode: 'Flight mode',
    flightOn: 'On',
    flightOff: 'Off',
    unknown: 'unknown',
    notFetched: 'Tap an action below to fetch',
    yes: 'Yes',
    no: 'No',
  },
  events: {
    title: 'Recent changes',
    empty: 'No network changes yet.',
    emptySubtitle: '変更はここに表示されます',
  },
  menu: {
    actionsSection: 'Actions',
    statusSection: 'Status',
    snapshot: 'Fetch Snapshot',
    snapshotHint: 'Fetches a one-time network state from the device',
    ip: 'Get IP Address',
    ipHint: 'Reads the device IP address on the current network',
    flightMode: 'Check Flight Mode',
    flightModeHint: 'Checks whether airplane mode is enabled on Android',
    fetching: 'Fetching…',
  },
  errors: {
    snapshot: 'Could not fetch network snapshot.',
    ip: 'Could not read IP address.',
    flightMode: 'Could not check flight mode.',
  },
} as const;

export function formatNetworkType(type: Network.NetworkStateType | undefined): string {
  return type ?? networkCopy.status.unknown;
}

export function formatNetworkEvent(state: Network.NetworkState): string {
  const type = formatNetworkType(state.type);
  return `${type} · connected=${String(state.isConnected)} · internet=${String(state.isInternetReachable)}`;
}
