import { AudioStatus } from 'expo-audio';
import { StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { audioCopy } from '@/constants/audio';
import { colors } from '@/theme/colors';
import { formatTime } from '@/utils/formatTime';

type AudioTrackCardProps = {
  status: AudioStatus;
};

function getPlaybackLabel(status: AudioStatus): string {
  if (status.isLoaded === false) {
    return audioCopy.track.loading;
  }

  if (status.playing) {
    return audioCopy.track.playing;
  }

  if (status.currentTime > 0) {
    return audioCopy.track.paused;
  }

  return audioCopy.track.ready;
}

export function AudioTrackCard({ status }: AudioTrackCardProps) {
  const progress =
    status.duration > 0 ? Math.min(status.currentTime / status.duration, 1) : 0;

  return (
    <View style={styles.card} accessibilityRole="summary">
      <Text style={styles.kanji}>聴</Text>
      <SectionDivider />

      <Text style={styles.trackTitle}>{audioCopy.track.title}</Text>
      <Text style={styles.trackSubtitle}>{audioCopy.track.subtitle}</Text>

      <View style={styles.waveRow} accessibilityElementsHidden>
        {[0.35, 0.65, 1, 0.55, 0.8, 0.45, 0.7].map((height, index) => (
          <View
            key={index}
            style={[
              styles.waveBar,
              { height: 18 + height * 28, opacity: status.playing ? 1 : 0.45 },
            ]}
          />
        ))}
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.timeText}>
          {formatTime(status.currentTime)} / {formatTime(status.duration)}
        </Text>
        <Text style={styles.stateText}>{getPlaybackLabel(status)}</Text>
      </View>
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
  trackTitle: {
    marginTop: 8,
    fontSize: 22,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  trackSubtitle: {
    marginTop: 6,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    textAlign: 'center',
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: 28,
    marginBottom: 20,
    height: 46,
  },
  waveBar: {
    width: 6,
    backgroundColor: colors.gold,
    borderRadius: 2,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: colors.washiDeep,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.vermillion,
  },
  metaRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  timeText: {
    fontSize: 12,
    color: colors.ink,
    letterSpacing: 0.4,
  },
  stateText: {
    fontSize: 12,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
});
