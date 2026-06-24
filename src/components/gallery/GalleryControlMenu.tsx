import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { MenuSection } from '@/components/ui/MenuSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { galleryCopy } from '@/constants/gallery';
import { colors } from '@/theme/colors';

type GalleryControlMenuProps = {
  loading: boolean;
  hasLimitedAccess: boolean;
  error: string | null;
  onRefresh: () => void;
  onSelectMore: () => void;
};

export function GalleryControlMenu({
  loading,
  hasLimitedAccess,
  error,
  onRefresh,
  onSelectMore,
}: GalleryControlMenuProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.panel}>
      <View style={styles.inner}>
        <SectionDivider />

        <MenuSection title={galleryCopy.menu.actionsSection}>
          <JapaneseButton
            kanji="更"
            label={loading ? galleryCopy.status.refreshing : galleryCopy.menu.refresh}
            onPress={onRefresh}
            disabled={loading}
            accessibilityLabel={galleryCopy.menu.refresh}
            accessibilityHint={galleryCopy.menu.refreshHint}
          />
          {hasLimitedAccess && (
            <JapaneseButton
              kanji="選"
              label={galleryCopy.menu.selectMore}
              onPress={onSelectMore}
              variant="outline"
              accessibilityLabel={galleryCopy.menu.selectMore}
              accessibilityHint={galleryCopy.menu.selectMoreHint}
            />
          )}
        </MenuSection>

        {error && (
          <MenuSection title={galleryCopy.menu.statusSection}>
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
