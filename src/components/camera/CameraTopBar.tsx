import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { cameraCopy } from '@/constants/camera';
import { colors } from '@/theme/colors';

export function CameraTopBar() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.inner} accessibilityRole="header">
        <Text style={styles.kanji} accessibilityElementsHidden>
          写
        </Text>
        <View>
          <Text style={styles.title}>{cameraCopy.camera.title}</Text>
          <Text style={styles.subtitle}>{cameraCopy.camera.subtitle}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.topBarBg,
    borderWidth: 1,
    borderColor: colors.topBarBorder,
  },
  kanji: {
    fontSize: 28,
    color: colors.vermillion,
    fontWeight: '300',
  },
  title: {
    fontSize: 16,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 11,
    color: colors.ink,
    opacity: 0.6,
    marginTop: 1,
  },
});
