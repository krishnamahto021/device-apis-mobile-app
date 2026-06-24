import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { JapaneseCard } from '@/components/ui/JapaneseCard';
import { MenuSection } from '@/components/ui/MenuSection';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { galleryCopy } from '@/constants/gallery';
import { openAppSettings } from '@/services/mediaLibraryService';
import { colors } from '@/theme/colors';

type GalleryPermissionDeniedScreenProps = {
  canAskAgain: boolean;
  onRequestPermission: () => void;
};

export function GalleryPermissionLoadingScreen() {
  return (
    <ScreenContainer centered accessibilityLabel={galleryCopy.loading.accessibilityLabel}>
      <JapaneseCard maxWidth={320}>
        <Text style={styles.kanji}>待</Text>
        <SectionDivider />
        <ActivityIndicator size="large" color={colors.vermillion} />
        <Text style={styles.title}>{galleryCopy.loading.title}</Text>
        <Text style={styles.subtitle}>{galleryCopy.loading.subtitle}</Text>
      </JapaneseCard>
    </ScreenContainer>
  );
}

export function GalleryPermissionDeniedScreen({
  canAskAgain,
  onRequestPermission,
}: GalleryPermissionDeniedScreenProps) {
  return (
    <ScreenContainer centered>
      <JapaneseCard accessibilityRole="summary">
        <Text style={styles.kanji}>許</Text>
        <Text style={styles.title}>{galleryCopy.permission.title}</Text>
        <SectionDivider />
        <Text style={styles.body}>{galleryCopy.permission.body}</Text>
        <Text style={styles.subtitle}>{galleryCopy.permission.subtitle}</Text>

        <MenuSection title="Actions">
          {!canAskAgain ? (
            <JapaneseButton
              kanji="設"
              label={galleryCopy.permission.settingsLabel}
              onPress={openAppSettings}
              accessibilityLabel={galleryCopy.permission.settingsLabel}
              accessibilityHint={galleryCopy.permission.settingsHint}
            />
          ) : (
            <JapaneseButton
              kanji="許"
              label={galleryCopy.permission.grantLabel}
              onPress={onRequestPermission}
              accessibilityLabel={galleryCopy.permission.grantLabel}
              accessibilityHint={galleryCopy.permission.grantHint}
            />
          )}
        </MenuSection>
      </JapaneseCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  kanji: {
    fontSize: 42,
    color: colors.vermillion,
    fontWeight: '300',
    letterSpacing: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  body: {
    marginTop: 4,
    fontSize: 15,
    color: colors.ink,
    textAlign: 'center',
    lineHeight: 22,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 24,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    textAlign: 'center',
  },
});
