import { StyleSheet, Text } from 'react-native';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { JapaneseCard } from '@/components/ui/JapaneseCard';
import { MenuSection } from '@/components/ui/MenuSection';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { cameraCopy } from '@/constants/camera';
import { openAppSettings } from '@/services/mediaLibraryService';
import { colors } from '@/theme/colors';

type PermissionDeniedScreenProps = {
  canAskAgain: boolean;
  onRequestPermission: () => void;
};

export function PermissionDeniedScreen({
  canAskAgain,
  onRequestPermission,
}: PermissionDeniedScreenProps) {
  return (
    <ScreenContainer centered>
      <JapaneseCard accessibilityRole="summary">
        <Text style={styles.kanji}>許</Text>
        <Text style={styles.title}>{cameraCopy.permission.title}</Text>
        <SectionDivider />
        <Text style={styles.body}>{cameraCopy.permission.body}</Text>
        <Text style={styles.subtitle}>{cameraCopy.permission.subtitle}</Text>

        <MenuSection title="Actions">
          {!canAskAgain ? (
            <JapaneseButton
              kanji="設"
              label={cameraCopy.permission.settingsLabel}
              onPress={openAppSettings}
              accessibilityLabel={cameraCopy.permission.settingsLabel}
              accessibilityHint={cameraCopy.permission.settingsHint}
            />
          ) : (
            <JapaneseButton
              kanji="許"
              label={cameraCopy.permission.grantLabel}
              onPress={onRequestPermission}
              accessibilityLabel={cameraCopy.permission.grantLabel}
              accessibilityHint={cameraCopy.permission.grantHint}
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
