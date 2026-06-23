import * as MediaLib from 'expo-media-library';
import { Linking } from 'react-native';

import { cameraCopy } from '@/constants/camera';
import { AppError, ErrorCodes } from '@/utils/errors';

type SavePhotoResult = Awaited<ReturnType<typeof MediaLib.saveToLibraryAsync>>;

export async function savePhotoToGallery(uri: string): Promise<SavePhotoResult> {
  const { granted, canAskAgain } = await MediaLib.requestPermissionsAsync(true);

  if (!granted) {
    if (!canAskAgain) {
      throw new AppError(
        cameraCopy.alerts.libraryDeniedMessage,
        ErrorCodes.MEDIA_LIBRARY_BLOCKED,
      );
    }

    throw new AppError(
      'Photo library permission denied.',
      ErrorCodes.MEDIA_LIBRARY_DENIED,
    );
  }

  try {
    return await MediaLib.saveToLibraryAsync(uri);
  } catch (error) {
    throw new AppError(
      error instanceof Error ? error.message : 'Could not save photo to gallery.',
      ErrorCodes.SAVE_TO_GALLERY_FAILED,
    );
  }
}

export function openAppSettings(): void {
  void Linking.openSettings();
}
