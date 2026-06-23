import { RecorderState } from 'expo-audio';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { recordingCopy } from '@/constants/recording';
import { colors } from '@/theme/colors';

type RecordingStatusCardProps = {
  recorderState: RecorderState;
  isPaused: boolean;
  hasRecording: boolean;
  isBusy: boolean;
};

function getStatusLabel(isPaused: boolean, isRecording: boolean, hasRecording: boolean): string {
  if (isRecording) {
    return recordingCopy.status.recording;
  }

  if (isPaused) {
    return recordingCopy.status.paused;
  }

  if (hasRecording) {
    return recordingCopy.status.complete;
  }

  return recordingCopy.status.ready;
}

export function RecordingStatusCard({
  recorderState,
  isPaused,
  hasRecording,
  isBusy,
}: RecordingStatusCardProps) {
  const statusLabel = getStatusLabel(isPaused, recorderState.isRecording, hasRecording);
  const seconds = Math.round(recorderState.durationMillis / 1000);

  return (
    <View style={styles.card} accessibilityRole="summary">
      <Text style={styles.kanji}>声</Text>
      <SectionDivider />

      <Text style={styles.duration}>{seconds}s</Text>
      <Text style={styles.statusLabel}>{statusLabel}</Text>

      <View style={styles.waveRow} accessibilityElementsHidden>
        {[0.4, 0.75, 1, 0.55, 0.85, 0.5, 0.7].map((height, index) => (
          <View
            key={index}
            style={[
              styles.waveBar,
              {
                height: 14 + height * 24,
                opacity: recorderState.isRecording ? 1 : isPaused ? 0.65 : 0.35,
              },
            ]}
          />
        ))}
      </View>

      {isBusy && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={colors.vermillion} />
          <Text style={styles.loadingText}>Working…</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  kanji: {
    fontSize: 42,
    color: colors.vermillion,
    fontWeight: '300',
    letterSpacing: 4,
    marginBottom: 8,
  },
  duration: {
    marginTop: 8,
    fontSize: 36,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 1,
  },
  statusLabel: {
    marginTop: 8,
    fontSize: 13,
    color: colors.ink,
    opacity: 0.7,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 24,
    height: 40,
  },
  waveBar: {
    width: 6,
    backgroundColor: colors.gold,
    borderRadius: 2,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  loadingText: {
    fontSize: 12,
    color: colors.ink,
    opacity: 0.7,
  },
});
