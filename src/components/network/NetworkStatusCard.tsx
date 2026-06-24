import * as Network from 'expo-network';
import { StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { formatNetworkType, networkCopy } from '@/constants/network';
import { colors } from '@/theme/colors';

type NetworkStatusCardProps = {
  liveState: Network.NetworkState;
  snapshot: Network.NetworkState | null;
  ipAddress: string | null;
  flightMode: boolean | null;
  showFlightMode: boolean;
};

function formatBoolean(value: boolean | undefined): string {
  if (value === undefined) {
    return networkCopy.status.unknown;
  }

  return value ? networkCopy.status.yes : networkCopy.status.no;
}

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function NetworkStatusCard({
  liveState,
  snapshot,
  ipAddress,
  flightMode,
  showFlightMode,
}: NetworkStatusCardProps) {
  const signalLevels = [0.35, 0.55, 0.75, 1];
  const connected = liveState.isConnected === true;

  return (
    <View style={styles.card} accessibilityRole="summary">
      <Text style={styles.kanji}>接</Text>
      <SectionDivider />

      <Text style={styles.liveTitle}>{networkCopy.status.liveLabel}</Text>
      <Text style={styles.typeValue}>{formatNetworkType(liveState.type)}</Text>

      <View style={styles.signalRow} accessibilityElementsHidden>
        {signalLevels.map((level, index) => (
          <View
            key={index}
            style={[
              styles.signalBar,
              {
                height: 10 + level * 22,
                opacity: connected ? 1 : 0.25,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.metaBlock}>
        <StatusRow label={networkCopy.status.connected} value={formatBoolean(liveState.isConnected)} />
        <StatusRow
          label={networkCopy.status.internet}
          value={formatBoolean(liveState.isInternetReachable)}
        />
      </View>

      {(snapshot || ipAddress || (showFlightMode && flightMode !== null)) && (
        <>
          <SectionDivider />
          <View style={styles.metaBlock}>
            {snapshot && (
              <StatusRow
                label={networkCopy.status.snapshot}
                value={`${formatNetworkType(snapshot.type)} · ${formatBoolean(snapshot.isConnected)}`}
              />
            )}
            {ipAddress && (
              <StatusRow label={networkCopy.status.ip} value={ipAddress} />
            )}
            {showFlightMode && flightMode !== null && (
              <StatusRow
                label={networkCopy.status.flightMode}
                value={flightMode ? networkCopy.status.flightOn : networkCopy.status.flightOff}
              />
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    paddingVertical: 28,
    paddingHorizontal: 24,
  },
  kanji: {
    fontSize: 42,
    color: colors.vermillion,
    fontWeight: '300',
    letterSpacing: 4,
    marginBottom: 8,
  },
  liveTitle: {
    marginTop: 8,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  typeValue: {
    marginTop: 6,
    fontSize: 28,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  signalRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginTop: 24,
    marginBottom: 20,
    height: 34,
  },
  signalBar: {
    width: 8,
    backgroundColor: colors.gold,
    borderRadius: 2,
  },
  metaBlock: {
    width: '100%',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  rowLabel: {
    fontSize: 12,
    color: colors.ink,
    opacity: 0.65,
    letterSpacing: 0.4,
  },
  rowValue: {
    flexShrink: 1,
    fontSize: 13,
    color: colors.indigo,
    fontWeight: '600',
    textAlign: 'right',
  },
});
