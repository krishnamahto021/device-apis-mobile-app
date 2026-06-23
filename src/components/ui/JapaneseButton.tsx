import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

export type JapaneseButtonVariant = 'primary' | 'secondary' | 'outline';

type JapaneseButtonProps = {
  kanji: string;
  label: string;
  onPress: () => void;
  variant?: JapaneseButtonVariant;
  disabled?: boolean;
  accessibilityLabel: string;
  accessibilityHint?: string;
};

export function JapaneseButton({
  kanji,
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
}: JapaneseButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
    >
      <View style={styles.content}>
        <Text style={[styles.kanji, styles[`${variant}Kanji`]]}>{kanji}</Text>
        <Text style={[styles.label, styles[`${variant}Label`]]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 6,
  },
  primary: {
    backgroundColor: colors.vermillion,
    borderColor: colors.vermillionDark,
  },
  secondary: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigoDark,
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.indigo,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    opacity: 0.85,
  },
  kanji: {
    fontSize: 24,
    fontWeight: '300',
    letterSpacing: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  primaryKanji: { color: colors.washi },
  primaryLabel: { color: colors.washi },
  secondaryKanji: { color: colors.washi },
  secondaryLabel: { color: colors.washi },
  outlineKanji: { color: colors.indigo },
  outlineLabel: { color: colors.indigo },
});
