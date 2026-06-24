import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { FILE_MODES, PickMode, filesCopy } from '@/constants/files';
import { colors } from '@/theme/colors';

type FileModeSelectorProps = {
  mode: PickMode;
  onModeChange: (mode: PickMode) => void;
};

export function FileModeSelector({ mode, onModeChange }: FileModeSelectorProps) {
  return (
    <View style={styles.card} accessibilityRole="radiogroup">
      <Text style={styles.title}>{filesCopy.mode.title}</Text>
      <Text style={styles.subtitle}>{filesCopy.mode.subtitle}</Text>
      <SectionDivider />

      <View style={styles.row}>
        {FILE_MODES.map((item) => {
          const active = mode === item.id;

          return (
            <Pressable
              key={item.id}
              onPress={() => onModeChange(item.id)}
              style={[styles.chip, active && styles.chipActive]}
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item.label}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
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
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.indigo,
    backgroundColor: 'transparent',
  },
  chipActive: {
    backgroundColor: colors.indigo,
    borderColor: colors.indigoDark,
  },
  chipText: {
    fontSize: 13,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  chipTextActive: {
    color: colors.washi,
  },
});
