import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import { JapaneseCard } from '@/components/ui/JapaneseCard';
import { ScreenContainer } from '@/components/ui/ScreenContainer';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { cameraCopy } from '@/constants/camera';
import { colors } from '@/theme/colors';

export function PermissionLoadingScreen() {
  return (
    <ScreenContainer centered accessibilityLabel={cameraCopy.loading.accessibilityLabel}>
      <JapaneseCard maxWidth={320}>
        <Text style={styles.kanji}>待</Text>
        <SectionDivider />
        <ActivityIndicator size="large" color={colors.vermillion} />
        <Text style={styles.title}>{cameraCopy.loading.title}</Text>
        <Text style={styles.subtitle}>{cameraCopy.loading.subtitle}</Text>
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
    marginTop: 16,
    fontSize: 18,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 1,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: colors.ink,
    opacity: 0.7,
    textAlign: 'center',
  },
});
