import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioPlayer,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';

import { recordingCopy } from '@/constants/recording';
import { openAppSettings, saveRecordingToLibrary } from '@/services/mediaLibraryService';
import { AppError, ErrorCodes, getErrorMessage } from '@/utils/errors';

export type ScreenStatus = {
  message: string;
  tone: 'info' | 'success' | 'error';
} | null;

type SetupState = 'loading' | 'ready' | 'denied' | 'blocked' | 'error';

export function useRecordingSession() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(recorder);
  const player = useAudioPlayer(null);

  const [setupState, setSetupState] = useState<SetupState>('loading');
  const [uri, setUri] = useState<string | null>(null);
  const [status, setStatus] = useState<ScreenStatus>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  const isPaused =
    recorderState.canRecord && !recorderState.isRecording && recorderState.durationMillis > 0;

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const permission = await AudioModule.requestRecordingPermissionsAsync();

        if (!mounted) {
          return;
        }

        if (!permission.granted) {
          setSetupState(permission.canAskAgain ? 'denied' : 'blocked');
          return;
        }

        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        });

        if (mounted) {
          setSetupState('ready');
        }
      } catch (error) {
        if (mounted) {
          setSetupState('error');
          setStatus({
            message: getErrorMessage(error, recordingCopy.feedback.setupFailed),
            tone: 'error',
          });
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const runAction = useCallback(
    async (action: () => Promise<void> | void, fallbackMessage: string) => {
      setIsBusy(true);
      try {
        await action();
      } catch (error) {
        setStatus({
          message: getErrorMessage(error, fallbackMessage),
          tone: 'error',
        });
      } finally {
        setIsBusy(false);
      }
    },
    [],
  );

  const startRecording = () =>
    runAction(async () => {
      setStatus(null);
      setUri(null);
      await recorder.prepareToRecordAsync();
      recorder.record();
    }, recordingCopy.feedback.recordFailed);

  const pauseRecording = () =>
    runAction(() => {
      recorder.pause();
    }, recordingCopy.feedback.recordFailed);

  const resumeRecording = () =>
    runAction(() => {
      recorder.record();
    }, recordingCopy.feedback.recordFailed);

  const stopRecording = () =>
    runAction(async () => {
      await recorder.stop();
      const recordingUri = recorder.uri;

      if (!recordingUri) {
        throw new AppError('No recording URI returned.', ErrorCodes.RECORDING_STOP_FAILED);
      }

      setUri(recordingUri);
      setStatus({ message: recordingCopy.status.complete, tone: 'success' });
    }, recordingCopy.feedback.stopFailed);

  const playRecording = () =>
    runAction(() => {
      if (!uri) {
        Alert.alert(recordingCopy.feedback.nothingToPlay, recordingCopy.feedback.recordFirst);
        return;
      }

      player.replace(uri);
      player.play();
      setStatus(null);
    }, recordingCopy.feedback.playFailed);

  const saveRecording = () =>
    runAction(async () => {
      if (!uri) {
        Alert.alert(recordingCopy.feedback.nothingToPlay, recordingCopy.feedback.recordFirst);
        return;
      }

      setIsSaving(true);
      setStatus({ message: recordingCopy.menu.saving, tone: 'info' });

      try {
        await saveRecordingToLibrary(uri);
        setStatus({ message: recordingCopy.feedback.saved, tone: 'success' });
      } catch (error) {
        if (error instanceof AppError && error.code === ErrorCodes.MEDIA_LIBRARY_BLOCKED) {
          Alert.alert(
            recordingCopy.alerts.libraryDeniedTitle,
            recordingCopy.alerts.libraryDeniedMessage,
            [
              { text: recordingCopy.alerts.cancel, style: 'cancel' },
              { text: recordingCopy.alerts.openSettings, onPress: openAppSettings },
            ],
          );
        }

        setStatus({
          message: getErrorMessage(error, recordingCopy.feedback.saveFailed),
          tone: 'error',
        });
      } finally {
        setIsSaving(false);
      }
    }, recordingCopy.feedback.saveFailed);

  const requestMicrophoneAccess = () =>
    runAction(async () => {
      const permission = await AudioModule.requestRecordingPermissionsAsync();

      if (permission.granted) {
        await setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        });
        setSetupState('ready');
        setStatus(null);
        return;
      }

      setSetupState(permission.canAskAgain ? 'denied' : 'blocked');
    }, recordingCopy.feedback.setupFailed);

  return {
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
    openSettings: () => Linking.openSettings(),
  };
}
