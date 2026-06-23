export class AppError extends Error {
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}

export const ErrorCodes = {
  CAMERA_NOT_READY: 'CAMERA_NOT_READY',
  PHOTO_CAPTURE_FAILED: 'PHOTO_CAPTURE_FAILED',
  MEDIA_LIBRARY_DENIED: 'MEDIA_LIBRARY_DENIED',
  MEDIA_LIBRARY_BLOCKED: 'MEDIA_LIBRARY_BLOCKED',
  SAVE_TO_GALLERY_FAILED: 'SAVE_TO_GALLERY_FAILED',
  SAVE_RECORDING_FAILED: 'SAVE_RECORDING_FAILED',
  CAMERA_MOUNT_FAILED: 'CAMERA_MOUNT_FAILED',
  RECORDING_SETUP_FAILED: 'RECORDING_SETUP_FAILED',
  RECORDING_START_FAILED: 'RECORDING_START_FAILED',
  RECORDING_STOP_FAILED: 'RECORDING_STOP_FAILED',
  PLAYBACK_FAILED: 'PLAYBACK_FAILED',
  MICROPHONE_DENIED: 'MICROPHONE_DENIED',
  MICROPHONE_BLOCKED: 'MICROPHONE_BLOCKED',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export function getErrorMessage(error: unknown, fallback = 'Something went wrong.'): string {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
