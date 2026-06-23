import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CameraControlMenu } from '@/components/camera/CameraControlMenu';
import { CameraTopBar } from '@/components/camera/CameraTopBar';
import { CameraViewfinderFrame } from '@/components/camera/CameraViewfinderFrame';
import { PermissionDeniedScreen } from '@/components/camera/PermissionDeniedScreen';
import { PermissionLoadingScreen } from '@/components/camera/PermissionLoadingScreen';
import { PhotoPreviewOverlay } from '@/components/camera/PhotoPreviewOverlay';
import { cameraCopy } from '@/constants/camera';
import { CameraStatus, useCameraCapture } from '@/hooks/useCameraCapture';
import { colors } from '@/theme/colors';

export function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [ready, setReady] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [status, setStatus] = useState<CameraStatus>(null);
  const [saving, setSaving] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const { takePhoto, saveToGallery } = useCameraCapture();

  const handleTakePhoto = async () => {
    const result = await takePhoto(cameraRef, ready);

    if (result.uri) {
      setPhotoUri(result.uri);
    }

    if (result.status) {
      setStatus(result.status);
    }
  };

  const handleSaveToGallery = async () => {
    if (!photoUri) {
      return;
    }

    setSaving(true);
    setStatus({ message: cameraCopy.status.saving, tone: 'info' });

    const result = await saveToGallery(photoUri);
    setStatus(result);
    setSaving(false);
  };

  const handleRetake = () => {
    setPhotoUri(null);
    setStatus(null);
    setReady(false);
  };

  const handleCameraMountError = ({ message }: { message: string }) => {
    setStatus({ message, tone: 'error' });
  };

  if (!permission) {
    return <PermissionLoadingScreen />;
  }

  if (!permission.granted) {
    return (
      <PermissionDeniedScreen
        canAskAgain={permission.canAskAgain}
        onRequestPermission={requestPermission}
      />
    );
  }

  return (
    <View style={styles.root}>
      <CameraView
        ref={cameraRef}
        facing="back"
        mode="picture"
        onCameraReady={() => setReady(true)}
        onMountError={handleCameraMountError}
        style={StyleSheet.absoluteFill}
      />

      <CameraViewfinderFrame />
      {photoUri && <PhotoPreviewOverlay uri={photoUri} />}
      <CameraTopBar />

      <CameraControlMenu
        photoUri={photoUri}
        ready={ready}
        saving={saving}
        status={status}
        onTakePhoto={handleTakePhoto}
        onSaveToGallery={handleSaveToGallery}
        onRetake={handleRetake}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.sumi,
  },
});
