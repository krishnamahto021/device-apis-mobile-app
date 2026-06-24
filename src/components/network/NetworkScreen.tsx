import { ScrollView, StyleSheet, View } from 'react-native';

import { NetworkControlMenu } from '@/components/network/NetworkControlMenu';
import { NetworkEventLog } from '@/components/network/NetworkEventLog';
import { NetworkStatusCard } from '@/components/network/NetworkStatusCard';
import { NetworkTopBar } from '@/components/network/NetworkTopBar';
import { useNetworkMonitor } from '@/hooks/useNetworkMonitor';
import { colors } from '@/theme/colors';

export function NetworkScreen() {
  const {
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
    isAndroid,
  } = useNetworkMonitor();

  return (
    <View style={styles.root}>
      <NetworkTopBar />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <NetworkStatusCard
          liveState={liveState}
          snapshot={snapshot}
          ipAddress={ipAddress}
          flightMode={flightMode}
          showFlightMode={isAndroid}
        />
        <NetworkEventLog events={events} />
      </ScrollView>

      <NetworkControlMenu
        busyAction={busyAction}
        showFlightMode={isAndroid}
        error={error}
        onFetchSnapshot={() => void refreshSnapshot()}
        onGetIpAddress={() => void refreshIpAddress()}
        onCheckFlightMode={() => void refreshFlightMode()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.washi,
  },
  scroll: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 16,
  },
});
