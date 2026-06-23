import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { MenuSection } from '@/components/ui/MenuSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { audioCopy } from '@/constants/audio';
import { colors } from '@/theme/colors';

type AudioControlMenuProps = {
  onPlay: () => void;
  onPause: () => void;
  onReplay: () => void;
  statusMessage: string | null;
  statusTone: 'info' | 'success' | 'error';
};

export function AudioControlMenu({
  onPlay,
  onPause,
  onReplay,
  statusMessage,
  statusTone,
}: AudioControlMenuProps) {
  return (
    <SafeAreaView edges={['bottom']} style={styles.panel}>
      <View style={styles.inner}>
        <SectionDivider />

        <MenuSection title={audioCopy.menu.playbackSection}>
          <JapaneseButton
            kanji="始"
            label={audioCopy.menu.play}
            onPress={onPlay}
            accessibilityLabel={audioCopy.menu.play}
            accessibilityHint={audioCopy.menu.playHint}
          />
          <JapaneseButton
            kanji="止"
            label={audioCopy.menu.pause}
            onPress={onPause}
            variant="secondary"
            accessibilityLabel={audioCopy.menu.pause}
            accessibilityHint={audioCopy.menu.pauseHint}
          />
          <JapaneseButton
            kanji="再"
            label={audioCopy.menu.replay}
            onPress={onReplay}
            variant="outline"
            accessibilityLabel={audioCopy.menu.replay}
            accessibilityHint={audioCopy.menu.replayHint}
          />
        </MenuSection>

        {statusMessage && (
          <MenuSection title={audioCopy.menu.statusSection}>
            <StatusMessage message={statusMessage} tone={statusTone} />
          </MenuSection>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  panel: {
    paddingHorizontal: 20,
  },
  inner: {
    backgroundColor: colors.washi,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 20,
  },
});
