import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { colors } from '@/theme/colors';

type JapaneseCardProps = ViewProps & {
  children: ReactNode;
  maxWidth?: number;
};

export function JapaneseCard({
  children,
  maxWidth = 340,
  style,
  ...props
}: JapaneseCardProps) {
  return (
    <View style={[styles.card, { maxWidth }, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    paddingVertical: 36,
    paddingHorizontal: 28,
    width: '100%',
  },
});
