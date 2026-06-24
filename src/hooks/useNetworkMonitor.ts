import * as Network from 'expo-network';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { NETWORK_EVENT_LIMIT, formatNetworkEvent, networkCopy } from '@/constants/network';
import { getErrorMessage } from '@/utils/errors';

type BusyAction = 'snapshot' | 'ip' | 'flight' | null;

export function useNetworkMonitor() {
  const liveState = Network.useNetworkState();
  const [snapshot, setSnapshot] = useState<Network.NetworkState | null>(null);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [flightMode, setFlightMode] = useState<boolean | null>(null);
  const [events, setEvents] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<BusyAction>(null);

  useEffect(() => {
    const subscription = Network.addNetworkStateListener((state) => {
      setEvents((current) => [formatNetworkEvent(state), ...current].slice(0, NETWORK_EVENT_LIMIT));
    });

    return () => subscription.remove();
  }, []);

  const refreshSnapshot = useCallback(async () => {
    setBusyAction('snapshot');
    setError(null);

    try {
      setSnapshot(await Network.getNetworkStateAsync());
    } catch (fetchError) {
      setError(getErrorMessage(fetchError, networkCopy.errors.snapshot));
    } finally {
      setBusyAction(null);
    }
  }, []);

  const refreshIpAddress = useCallback(async () => {
    setBusyAction('ip');
    setError(null);

    try {
      setIpAddress(await Network.getIpAddressAsync());
    } catch (fetchError) {
      setError(getErrorMessage(fetchError, networkCopy.errors.ip));
    } finally {
      setBusyAction(null);
    }
  }, []);

  const refreshFlightMode = useCallback(async () => {
    if (Platform.OS !== 'android') {
      setFlightMode(null);
      return;
    }

    setBusyAction('flight');
    setError(null);

    try {
      setFlightMode(await Network.isAirplaneModeEnabledAsync());
    } catch (fetchError) {
      setError(getErrorMessage(fetchError, networkCopy.errors.flightMode));
    } finally {
      setBusyAction(null);
    }
  }, []);

  return {
    liveState,
    snapshot,
    ipAddress,
    flightMode,
    events,
    error,
    busyAction,
    refreshSnapshot,
    refreshIpAddress,
    refreshFlightMode,
    isAndroid: Platform.OS === 'android',
  };
}
