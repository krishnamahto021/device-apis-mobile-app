import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AudioControlMenu } from '@/components/audio/AudioControlMenu';
import { AudioTopBar } from '@/components/audio/AudioTopBar';
import { AudioTrackCard } from '@/components/audio/AudioTrackCard';
import { AUDIO_SAMPLE_URI, audioCopy } from '@/constants/audio';
import { colors } from '@/theme/colors';
import { getErrorMessage } from '@/utils/errors';

type StatusTone = 'info' | 'success' | 'error';

export function AudioScreen() {
  const player = useAudioPlayer(AUDIO_SAMPLE_URI);
  const playbackStatus = useAudioPlayerStatus(player);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<StatusTone>('error');

  const runPlaybackAction = (action: () => void, fallbackMessage: string) => {
    try {
      action();
      setStatusMessage(null);
    } catch (error) {
      setStatusMessage(getErrorMessage(error, fallbackMessage));
      setStatusTone('error');
    }
  };

  const handlePlay = () => {
    runPlaybackAction(() => player.play(), audioCopy.status.playError);
  };

  const handlePause = () => {
    runPlaybackAction(() => player.pause(), audioCopy.status.pauseError);
  };

  const handleReplay = () => {
    runPlaybackAction(() => {
      player.seekTo(0);
      player.play();
    }, audioCopy.status.replayError);
  };

  return (
    <View style={styles.root}>
      <AudioTopBar />

      <View style={styles.content}>
        <AudioTrackCard status={playbackStatus} />
      </View>

      <AudioControlMenu
        onPlay={handlePlay}
        onPause={handlePause}
        onReplay={handleReplay}
        statusMessage={statusMessage}
        statusTone={statusTone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.washi,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
