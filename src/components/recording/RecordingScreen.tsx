import { StyleSheet, View } from 'react-native';

import { RecordingControlMenu } from '@/components/recording/RecordingControlMenu';
import { RecordingSetupScreen } from '@/components/recording/RecordingSetupScreen';
import { RecordingStatusCard } from '@/components/recording/RecordingStatusCard';
import { RecordingTopBar } from '@/components/recording/RecordingTopBar';
import { useRecordingSession } from '@/hooks/useRecordingSession';
import { colors } from '@/theme/colors';

export function RecordingScreen() {
  const {
    setupState,
    recorderState,
    uri,
    status,
    isPaused,
    isSaving,
    isBusy,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    playRecording,
    saveRecording,
    requestMicrophoneAccess,
    openSettings,
  } = useRecordingSession();

  if (setupState === 'loading') {
    return <RecordingSetupScreen variant="loading" onOpenSettings={openSettings} />;
  }

  if (setupState === 'denied') {
    return (
      <RecordingSetupScreen
        variant="denied"
        onOpenSettings={openSettings}
        onRequestPermission={requestMicrophoneAccess}
      />
    );
  }

  if (setupState === 'blocked') {
    return <RecordingSetupScreen variant="blocked" onOpenSettings={openSettings} />;
  }

  if (setupState === 'error') {
    return (
      <RecordingSetupScreen
        variant="error"
        onOpenSettings={openSettings}
        errorMessage={status?.message}
      />
    );
  }

  return (
    <View style={styles.root}>
      <RecordingTopBar />

      <View style={styles.content}>
        <RecordingStatusCard
          recorderState={recorderState}
          isPaused={isPaused}
          hasRecording={!!uri}
          isBusy={isBusy || isSaving}
        />
      </View>

      <RecordingControlMenu
        isRecording={recorderState.isRecording}
        isPaused={isPaused}
        hasRecording={!!uri}
        isBusy={isBusy}
        isSaving={isSaving}
        status={status}
        onStart={startRecording}
        onPause={pauseRecording}
        onResume={resumeRecording}
        onStop={stopRecording}
        onPlay={playRecording}
        onSave={saveRecording}
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
