import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { MenuSection } from '@/components/ui/MenuSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { filesCopy } from '@/constants/files';
import { colors } from '@/theme/colors';

type FileControlMenuProps = {
  allowMultiple: boolean;
  picking: boolean;
  status: string | null;
  error: string | null;
  onAllowMultipleChange: (value: boolean) => void;
  onPick: () => void;
};

export function FileControlMenu({
  allowMultiple,
  picking,
  status,
  error,
  onAllowMultipleChange,
  onPick,
}: FileControlMenuProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.panel}>
      <View style={styles.inner}>
        <SectionDivider />

        <MenuSection title={filesCopy.menu.optionsSection}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleCopy}>
              <Text style={styles.toggleLabel}>{filesCopy.menu.multiple}</Text>
            </View>
            <Switch
              value={allowMultiple}
              onValueChange={onAllowMultipleChange}
              trackColor={{ false: colors.washiDeep, true: colors.indigo }}
              thumbColor={colors.paper}
              accessibilityLabel={filesCopy.menu.multiple}
              accessibilityHint={filesCopy.menu.multipleHint}
            />
          </View>
        </MenuSection>

        <MenuSection title={filesCopy.menu.actionsSection}>
          <JapaneseButton
            kanji="選"
            label={picking ? filesCopy.menu.picking : filesCopy.menu.pick}
            onPress={onPick}
            disabled={picking}
            accessibilityLabel={filesCopy.menu.pick}
            accessibilityHint={filesCopy.menu.pickHint}
          />
        </MenuSection>

        {status && (
          <MenuSection title={filesCopy.menu.statusSection}>
            <StatusMessage message={status} tone="info" />
          </MenuSection>
        )}

        {error && (
          <MenuSection title={filesCopy.menu.statusSection}>
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
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    backgroundColor: colors.paper,
  },
  toggleCopy: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 14,
    color: colors.indigo,
    fontWeight: '600',
  },
});
