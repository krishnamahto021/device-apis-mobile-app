import { StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { networkCopy } from '@/constants/network';
import { colors } from '@/theme/colors';

type NetworkEventLogProps = {
  events: string[];
};

export function NetworkEventLog({ events }: NetworkEventLogProps) {
  return (
    <View style={styles.card} accessibilityRole="list">
      <Text style={styles.title}>{networkCopy.events.title}</Text>
      <SectionDivider />

      {events.length === 0 ? (
        <View style={styles.emptyBlock}>
          <Text style={styles.emptyTitle}>{networkCopy.events.empty}</Text>
          <Text style={styles.emptySubtitle}>{networkCopy.events.emptySubtitle}</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {events.map((event, index) => (
            <View key={`${event}-${index}`} style={styles.eventRow}>
              <Text style={styles.eventIndex}>{index + 1}</Text>
              <Text style={styles.eventText}>{event}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.indigo,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  emptyBlock: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  emptyTitle: {
    marginTop: 8,
    fontSize: 14,
    color: colors.ink,
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    textAlign: 'center',
  },
  list: {
    marginTop: 8,
    gap: 10,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: colors.washi,
    borderWidth: 1,
    borderColor: colors.washiDeep,
  },
  eventIndex: {
    width: 18,
    fontSize: 12,
    color: colors.vermillion,
    fontWeight: '700',
  },
  eventText: {
    flex: 1,
    fontSize: 12,
    color: colors.ink,
    lineHeight: 18,
  },
});
