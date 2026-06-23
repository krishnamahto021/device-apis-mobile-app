import { StyleSheet, Text, View } from 'react-native';

import { colors } from '@/theme/colors';

type MenuSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <View style={styles.section} accessibilityRole="none">
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      <View style={styles.items}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    gap: 12,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.indigo,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  items: {
    width: '100%',
    gap: 12,
  },
});
