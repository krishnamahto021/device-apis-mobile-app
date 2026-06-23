import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { colors } from '@/theme/colors';

type ScreenContainerProps = ViewProps & {
  children: ReactNode;
  centered?: boolean;
};

export function ScreenContainer({ children, centered = false, style, ...props }: ScreenContainerProps) {
  return (
    <View
      style={[styles.screen, centered && styles.centered, style]}
      accessibilityRole="none"
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.washi,
    padding: 28,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
