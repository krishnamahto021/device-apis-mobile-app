import { CameraView } from 'expo-camera';
import { Alert } from 'react-native';
import { RefObject } from 'react';

import { cameraCopy } from '@/constants/camera';
import { openAppSettings, savePhotoToGallery } from '@/services/mediaLibraryService';
import { AppError, ErrorCodes, getErrorMessage } from '@/utils/errors';

export type CameraStatus = {
  message: string;
  tone: 'info' | 'success' | 'error';
} | null;

type UseCameraCaptureOptions = {
  onPhotoCaptured?: (uri: string) => void;
};

export function useCameraCapture({ onPhotoCaptured }: UseCameraCaptureOptions = {}) {
  const showLibraryBlockedAlert = () => {
    Alert.alert(
      cameraCopy.alerts.libraryDeniedTitle,
      cameraCopy.alerts.libraryDeniedMessage,
      [
        { text: cameraCopy.alerts.cancel, style: 'cancel' },
        { text: cameraCopy.alerts.openSettings, onPress: openAppSettings },
      ],
    );
  };

  const takePhoto = async (
    cameraRef: RefObject<CameraView | null>,
    ready: boolean,
  ): Promise<{ uri: string | null; status: CameraStatus }> => {
    if (!cameraRef.current || !ready) {
      Alert.alert(
        cameraCopy.alerts.cameraNotReadyTitle,
        cameraCopy.alerts.cameraNotReadyMessage,
      );
      return { uri: null, status: null };
    }

    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.9 });

      if (!photo?.uri) {
        throw new AppError('No photo URI returned.', ErrorCodes.PHOTO_CAPTURE_FAILED);
      }

      onPhotoCaptured?.(photo.uri);
      return { uri: photo.uri, status: null };
    } catch (error) {
      const message = getErrorMessage(error, 'Could not capture photo.');
      Alert.alert(cameraCopy.alerts.photoFailedTitle, message);
      return {
        uri: null,
        status: { message, tone: 'error' },
      };
    }
  };

  const saveToGallery = async (uri: string): Promise<CameraStatus> => {
    try {
      await savePhotoToGallery(uri);
      return { message: cameraCopy.status.saved, tone: 'success' };
    } catch (error) {
      if (error instanceof AppError && error.code === ErrorCodes.MEDIA_LIBRARY_BLOCKED) {
        showLibraryBlockedAlert();
      }

      return {
        message: getErrorMessage(error, 'Could not save photo.'),
        tone: 'error',
      };
    }
  };

  return {
    takePhoto,
    saveToGallery,
  };
}
