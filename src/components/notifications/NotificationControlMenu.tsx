import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { MenuSection } from '@/components/ui/MenuSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { notificationsCopy } from '@/constants/notifications';
import { colors } from '@/theme/colors';

type NotificationControlMenuProps = {
  permissionGranted: boolean;
  onInstant: () => void;
  onRouter: () => void;
  onDaily: () => void;
  onClear: () => void;
};

export function NotificationControlMenu({
  permissionGranted,
  onInstant,
  onRouter,
  onDaily,
  onClear,
}: NotificationControlMenuProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.panel}>
      <View style={styles.inner}>
        <SectionDivider />

        <MenuSection title={notificationsCopy.menu.scheduleSection}>
          <JapaneseButton
            kanji="即"
            label={notificationsCopy.menu.instant}
            onPress={onInstant}
            disabled={!permissionGranted}
            accessibilityLabel={notificationsCopy.menu.instant}
            accessibilityHint={notificationsCopy.menu.instantHint}
          />
          <JapaneseButton
            kanji="道"
            label={notificationsCopy.menu.router}
            onPress={onRouter}
            disabled={!permissionGranted}
            variant="secondary"
            accessibilityLabel={notificationsCopy.menu.router}
            accessibilityHint={notificationsCopy.menu.routerHint}
          />
          <JapaneseButton
            kanji="毎"
            label={notificationsCopy.menu.daily}
            onPress={onDaily}
            disabled={!permissionGranted}
            variant="secondary"
            accessibilityLabel={notificationsCopy.menu.daily}
            accessibilityHint={notificationsCopy.menu.dailyHint}
          />
        </MenuSection>

        <MenuSection title={notificationsCopy.menu.manageSection}>
          <JapaneseButton
            kanji="消"
            label={notificationsCopy.menu.clear}
            onPress={onClear}
            variant="outline"
            accessibilityLabel={notificationsCopy.menu.clear}
            accessibilityHint={notificationsCopy.menu.clearHint}
          />
        </MenuSection>

        {!permissionGranted && (
          <StatusMessage message={notificationsCopy.menu.permissionDenied} tone="error" />
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
