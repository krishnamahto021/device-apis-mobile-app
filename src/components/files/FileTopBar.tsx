import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { filesCopy } from '@/constants/files';
import { colors } from '@/theme/colors';

export function FileTopBar() {
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View style={styles.inner} accessibilityRole="header">
        <Text style={styles.kanji} accessibilityElementsHidden>
          文
        </Text>
        <View>
          <Text style={styles.title}>{filesCopy.header.title}</Text>
          <Text style={styles.subtitle}>{filesCopy.header.subtitle}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
