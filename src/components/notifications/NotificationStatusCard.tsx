import { StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { notificationsCopy } from '@/constants/notifications';
import { colors } from '@/theme/colors';

type NotificationStatusCardProps = {
  permissionGranted: boolean | null;
  lastNotificationTitle: string | null;
};

function StatusRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

export function NotificationStatusCard({
  permissionGranted,
  lastNotificationTitle,
}: NotificationStatusCardProps) {
  const permissionValue =
    permissionGranted === null
      ? notificationsCopy.status.none
      : permissionGranted
        ? notificationsCopy.status.granted
        : notificationsCopy.status.denied;

  return (
    <View style={styles.card} accessibilityRole="summary">
      <Text style={styles.kanji}>知</Text>
      <SectionDivider />

      <Text style={styles.liveTitle}>{notificationsCopy.status.permission}</Text>
      <Text style={styles.permissionValue}>{permissionValue}</Text>

      <View style={styles.metaBlock}>
        <StatusRow
          label={notificationsCopy.status.dailyReminder}
          value={notificationsCopy.status.dailyTime}
        />
        <StatusRow
          label={notificationsCopy.status.lastReceived}
          value={lastNotificationTitle ?? notificationsCopy.status.none}
        />
      </View>

      <SectionDivider />
      <Text style={styles.hint}>{notificationsCopy.status.hint}</Text>
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
    gap: 12,
  },
  kanji: {
    fontSize: 42,
    color: colors.vermillion,
    fontWeight: '300',
    letterSpacing: 4,
    marginBottom: 8,
  },
  liveTitle: {
    marginTop: 4,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  permissionValue: {
    marginTop: 6,
    fontSize: 28,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  metaBlock: {
    width: '100%',
    gap: 10,
    marginTop: 8,
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
  hint: {
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    lineHeight: 18,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
