import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { JapaneseCard } from '@/components/ui/JapaneseCard';
import { MenuSection } from '@/components/ui/MenuSection';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { recordingCopy } from '@/constants/recording';
import { colors } from '@/theme/colors';

type RecordingSetupScreenProps = {
  onOpenSettings: () => void;
  onRequestPermission?: () => void;
  variant: 'loading' | 'denied' | 'blocked' | 'error';
  errorMessage?: string | null;
};

export function RecordingSetupScreen({
  onOpenSettings,
  onRequestPermission,
  variant,
  errorMessage,
}: RecordingSetupScreenProps) {
  if (variant === 'loading') {
    return (
      <ScreenContainer centered accessibilityLabel={recordingCopy.loading.accessibilityLabel}>
        <JapaneseCard maxWidth={320}>
          <Text style={styles.kanji}>待</Text>
          <SectionDivider />
          <ActivityIndicator size="large" color={colors.vermillion} />
          <Text style={styles.title}>{recordingCopy.loading.title}</Text>
          <Text style={styles.subtitle}>{recordingCopy.loading.subtitle}</Text>
        </JapaneseCard>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer centered>
      <JapaneseCard>
        <Text style={styles.kanji}>許</Text>
        <Text style={styles.title}>{recordingCopy.permission.title}</Text>
        <SectionDivider />
        <Text style={styles.body}>{recordingCopy.permission.body}</Text>
        <Text style={styles.subtitle}>{recordingCopy.permission.subtitle}</Text>

        {variant === 'error' && errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <MenuSection title="Actions">
          {variant === 'denied' && onRequestPermission && (
            <JapaneseButton
              kanji="許"
              label={recordingCopy.permission.grantLabel}
              onPress={onRequestPermission}
              accessibilityLabel={recordingCopy.permission.grantLabel}
              accessibilityHint={recordingCopy.permission.grantHint}
            />
          )}

          {(variant === 'blocked' || variant === 'denied') && (
            <JapaneseButton
              kanji="設"
              label={recordingCopy.permission.settingsLabel}
              onPress={onOpenSettings}
              variant={variant === 'denied' ? 'outline' : 'primary'}
              accessibilityLabel={recordingCopy.permission.settingsLabel}
              accessibilityHint={recordingCopy.permission.settingsHint}
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
  errorText: {
    marginBottom: 16,
    fontSize: 13,
    color: colors.vermillion,
    textAlign: 'center',
    lineHeight: 18,
  },
});
