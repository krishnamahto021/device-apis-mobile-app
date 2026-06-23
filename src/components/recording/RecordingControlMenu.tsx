import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { MenuSection } from '@/components/ui/MenuSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { recordingCopy } from '@/constants/recording';
import { ScreenStatus } from '@/hooks/useRecordingSession';
import { colors } from '@/theme/colors';

type RecordingControlMenuProps = {
  isRecording: boolean;
  isPaused: boolean;
  hasRecording: boolean;
  isBusy: boolean;
  isSaving: boolean;
  status: ScreenStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onPlay: () => void;
  onSave: () => void;
};

export function RecordingControlMenu({
  isRecording,
  isPaused,
  hasRecording,
  isBusy,
  isSaving,
  status,
  onStart,
  onPause,
  onResume,
  onStop,
  onPlay,
  onSave,
}: RecordingControlMenuProps) {
  const disabled = isBusy || isSaving;

  return (
    <SafeAreaView edges={['bottom']} style={styles.panel}>
      <View style={styles.inner}>
        <SectionDivider />

        <MenuSection title={recordingCopy.menu.recordSection}>
          {!isRecording && !isPaused && (
            <JapaneseButton
              kanji="始"
              label={recordingCopy.menu.start}
              onPress={onStart}
              disabled={disabled}
              accessibilityLabel={recordingCopy.menu.start}
              accessibilityHint={recordingCopy.menu.startHint}
            />
          )}

          {isRecording && (
            <>
              <JapaneseButton
                kanji="止"
                label={recordingCopy.menu.pause}
                onPress={onPause}
                variant="secondary"
                disabled={disabled}
                accessibilityLabel={recordingCopy.menu.pause}
                accessibilityHint={recordingCopy.menu.pauseHint}
              />
              <JapaneseButton
                kanji="完"
                label={recordingCopy.menu.stop}
                onPress={onStop}
                variant="outline"
                disabled={disabled}
                accessibilityLabel={recordingCopy.menu.stop}
                accessibilityHint={recordingCopy.menu.stopHint}
              />
            </>
          )}

          {isPaused && (
            <>
              <JapaneseButton
                kanji="再"
                label={recordingCopy.menu.resume}
                onPress={onResume}
                disabled={disabled}
                accessibilityLabel={recordingCopy.menu.resume}
                accessibilityHint={recordingCopy.menu.resumeHint}
              />
              <JapaneseButton
                kanji="完"
                label={recordingCopy.menu.stop}
                onPress={onStop}
                variant="outline"
                disabled={disabled}
                accessibilityLabel={recordingCopy.menu.stop}
                accessibilityHint={recordingCopy.menu.stopHint}
              />
            </>
          )}
        </MenuSection>

        {hasRecording && !isRecording && !isPaused && (
          <>
            <MenuSection title={recordingCopy.menu.playbackSection}>
              <JapaneseButton
                kanji="聴"
                label={recordingCopy.menu.play}
                onPress={onPlay}
                variant="secondary"
                disabled={disabled}
                accessibilityLabel={recordingCopy.menu.play}
                accessibilityHint={recordingCopy.menu.playHint}
              />
            </MenuSection>

            <MenuSection title={recordingCopy.menu.saveSection}>
              <JapaneseButton
                kanji="保"
                label={isSaving ? recordingCopy.menu.saving : recordingCopy.menu.save}
                onPress={onSave}
                disabled={disabled}
                accessibilityLabel={recordingCopy.menu.save}
                accessibilityHint={recordingCopy.menu.saveHint}
              />
            </MenuSection>
          </>
        )}

        {status && (
          <MenuSection title={recordingCopy.menu.statusSection}>
            <StatusMessage message={status.message} tone={status.tone} />
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
