import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

export function SectionDivider() {
  return (
    <View style={styles.container} accessibilityElementsHidden importantForAccessibility="no">
      <View style={styles.line} />
      <Text style={styles.mark}>◆</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gold,
    opacity: 0.5,
  },
  mark: {
    fontSize: 8,
    color: colors.gold,
  },
});
