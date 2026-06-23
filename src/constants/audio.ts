export const AUDIO_SAMPLE_URI =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3';

export const audioCopy = {
  header: {
    title: 'Audio',
    subtitle: '音声を聴く',
  },
  track: {
    title: 'T-Rex Roar',
    subtitle: 'サンプル音声 · sample clip',
    ready: 'Ready',
    playing: 'Playing',
    paused: 'Paused',
    loading: 'Loading…',
  },
  menu: {
    playbackSection: 'Playback',
    statusSection: 'Status',
    play: 'Play',
    playHint: 'Starts audio playback',
    pause: 'Pause',
    pauseHint: 'Pauses audio playback',
    replay: 'Replay',
    replayHint: 'Restarts the clip from the beginning',
  },
  status: {
    playError: 'Could not start playback.',
    pauseError: 'Could not pause playback.',
    replayError: 'Could not replay audio.',
  },
} as const;
