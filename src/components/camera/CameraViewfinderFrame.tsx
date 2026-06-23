import { StyleSheet, View } from 'react-native';

import { colors } from '@/theme/colors';

export function CameraViewfinderFrame() {
  return (
    <>
      <View style={[styles.corner, styles.topLeft]} pointerEvents="none" />
      <View style={[styles.corner, styles.topRight]} pointerEvents="none" />
      <View style={[styles.corner, styles.bottomLeft]} pointerEvents="none" />
      <View style={[styles.corner, styles.bottomRight]} pointerEvents="none" />
    </>
  );
}

const cornerBase = {
  position: 'absolute' as const,
  width: 28,
  height: 28,
  borderColor: colors.gold,
};

const styles = StyleSheet.create({
  corner: cornerBase,
  topLeft: {
    top: 72,
    left: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
  },
  topRight: {
    top: 72,
    right: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
  },
  bottomLeft: {
    bottom: 220,
    left: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
  },
  bottomRight: {
    bottom: 220,
    right: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
  },
});
