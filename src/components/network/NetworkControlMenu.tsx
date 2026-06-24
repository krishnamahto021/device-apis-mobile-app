import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { MenuSection } from '@/components/ui/MenuSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { networkCopy } from '@/constants/network';
import { colors } from '@/theme/colors';

type NetworkControlMenuProps = {
  busyAction: 'snapshot' | 'ip' | 'flight' | null;
  showFlightMode: boolean;
  error: string | null;
  onFetchSnapshot: () => void;
  onGetIpAddress: () => void;
  onCheckFlightMode: () => void;
};

export function NetworkControlMenu({
  busyAction,
  showFlightMode,
  error,
  onFetchSnapshot,
  onGetIpAddress,
  onCheckFlightMode,
}: NetworkControlMenuProps) {
  const isBusy = busyAction !== null;

  return (
    <SafeAreaView edges={['bottom']} style={styles.panel}>
      <View style={styles.inner}>
        <SectionDivider />

        <MenuSection title={networkCopy.menu.actionsSection}>
          <JapaneseButton
            kanji="取"
            label={
              busyAction === 'snapshot' ? networkCopy.menu.fetching : networkCopy.menu.snapshot
            }
            onPress={onFetchSnapshot}
            disabled={isBusy}
            accessibilityLabel={networkCopy.menu.snapshot}
            accessibilityHint={networkCopy.menu.snapshotHint}
          />
          <JapaneseButton
            kanji="址"
            label={busyAction === 'ip' ? networkCopy.menu.fetching : networkCopy.menu.ip}
            onPress={onGetIpAddress}
            disabled={isBusy}
            variant="secondary"
            accessibilityLabel={networkCopy.menu.ip}
            accessibilityHint={networkCopy.menu.ipHint}
          />
          {showFlightMode && (
            <JapaneseButton
              kanji="飛"
              label={
                busyAction === 'flight' ? networkCopy.menu.fetching : networkCopy.menu.flightMode
              }
              onPress={onCheckFlightMode}
              disabled={isBusy}
              variant="outline"
              accessibilityLabel={networkCopy.menu.flightMode}
              accessibilityHint={networkCopy.menu.flightModeHint}
            />
          )}
        </MenuSection>

        {error && (
          <MenuSection title={networkCopy.menu.statusSection}>
            <StatusMessage message={error} tone="error" />
          </MenuSection>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingHorizontal: 20,
  },
  inner: {
    backgroundColor: colors.washi,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 20,
  },
});
