import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type StatusMessageProps = {
  message: string;
  tone?: 'info' | 'success' | 'error';
};

export function StatusMessage({ message, tone = 'info' }: StatusMessageProps) {
  return (
    <View
      style={[styles.pill, styles[tone]]}
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  info: {
    backgroundColor: colors.washiDeep,
    borderColor: colors.statusBorder,
  },
  success: {
    backgroundColor: '#E8F0E8',
    borderColor: '#8BA888',
  },
  error: {
    backgroundColor: '#F8E8EA',
    borderColor: colors.vermillion,
  },
  text: {
    fontSize: 13,
    color: colors.ink,
    letterSpacing: 0.3,
    textAlign: 'center',
    lineHeight: 18,
  },
});
