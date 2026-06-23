import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import { cameraCopy } from '@/constants/camera';
import { colors } from '@/theme/colors';

type PhotoPreviewOverlayProps = {
  uri: string;
};

export function PhotoPreviewOverlay({ uri }: PhotoPreviewOverlayProps) {
  return (
    <View style={styles.overlay} accessibilityRole="image" accessibilityLabel="Captured photo preview">
      <View style={styles.frame}>
        <View style={styles.frameInner}>
          <Image source={{ uri }} style={styles.preview} contentFit="cover" />
        </View>
        <Text style={styles.caption}>{cameraCopy.camera.photoCaption}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.mist,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  frame: {
    backgroundColor: colors.washi,
    padding: 14,
    paddingBottom: 36,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    width: '100%',
    maxWidth: 340,
  },
  frameInner: {
    aspectRatio: 3 / 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.gold,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  caption: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    fontSize: 11,
    color: colors.ink,
    opacity: 0.5,
    letterSpacing: 2,
  },
});
