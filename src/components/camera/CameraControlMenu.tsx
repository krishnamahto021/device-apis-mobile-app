import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { JapaneseButton } from '@/components/ui/JapaneseButton';
import { MenuSection } from '@/components/ui/MenuSection';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { cameraCopy } from '@/constants/camera';
import { CameraStatus } from '@/hooks/useCameraCapture';
import { colors } from '@/theme/colors';

type CameraControlMenuProps = {
  photoUri: string | null;
  ready: boolean;
  saving: boolean;
  status: CameraStatus;
  onTakePhoto: () => void;
  onSaveToGallery: () => void;
  onRetake: () => void;
};

export function CameraControlMenu({
  photoUri,
  ready,
  saving,
  status,
  onTakePhoto,
  onSaveToGallery,
  onRetake,
}: CameraControlMenuProps) {
  return (
    <SafeAreaView style={styles.panel} edges={['bottom']}>
      <View style={styles.inner}>
        <SectionDivider />

        {!photoUri ? (
          <MenuSection title={cameraCopy.camera.menuCaptureSection}>
            <JapaneseButton
              kanji="撮"
              label={cameraCopy.camera.takePhoto}
              onPress={onTakePhoto}
              disabled={!ready}
              accessibilityLabel={cameraCopy.camera.takePhoto}
              accessibilityHint={cameraCopy.camera.takePhotoHint}
            />
          </MenuSection>
        ) : (
          <MenuSection title={cameraCopy.camera.menuPhotoSection}>
            <JapaneseButton
              kanji="保"
              label={saving ? 'Saving…' : cameraCopy.camera.saveToGallery}
              onPress={onSaveToGallery}
              variant="secondary"
              disabled={saving}
              accessibilityLabel={cameraCopy.camera.saveToGallery}
              accessibilityHint={cameraCopy.camera.saveToGalleryHint}
            />
            <JapaneseButton
              kanji="再"
              label={cameraCopy.camera.retake}
              onPress={onRetake}
              variant="outline"
              accessibilityLabel={cameraCopy.camera.retake}
              accessibilityHint={cameraCopy.camera.retakeHint}
            />
          </MenuSection>
        )}

        {status && (
          <MenuSection title={cameraCopy.camera.statusSection}>
            <StatusMessage message={status.message} tone={status.tone} />
          </MenuSection>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inner: {
    backgroundColor: colors.washi,
    borderTopWidth: 1,
    borderTopColor: colors.washiDeep,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 20,
  },
});
