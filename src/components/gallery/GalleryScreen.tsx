import * as MediaLib from 'expo-media-library';
import { StyleSheet, View } from 'react-native';

import { GalleryControlMenu } from '@/components/gallery/GalleryControlMenu';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import {
  GalleryPermissionDeniedScreen,
  GalleryPermissionLoadingScreen,
} from '@/components/gallery/GalleryPermissionScreens';
import { GalleryTopBar } from '@/components/gallery/GalleryTopBar';
import { useGalleryAssets } from '@/hooks/useGalleryAssets';
import { colors } from '@/theme/colors';

export function GalleryScreen() {
  const { permission, requestPermission, loading, assets, error, loadGallery } = useGalleryAssets();

  const handleSelectMore = async () => {
    await MediaLib.presentPermissionsPickerAsync();
    void loadGallery();
  };

  if (!permission) {
    return <GalleryPermissionLoadingScreen />;
  }

  if (!permission.granted) {
    return (
      <GalleryPermissionDeniedScreen
        canAskAgain={permission.canAskAgain}
        onRequestPermission={requestPermission}
      />
    );
  }

  return (
    <View style={styles.root}>
      <GalleryTopBar />

      <View style={styles.content}>
        <GalleryGrid
          assets={assets}
          loading={loading}
          accessPrivileges={permission.accessPrivileges}
        />
      </View>

      <GalleryControlMenu
        loading={loading}
        hasLimitedAccess={permission.accessPrivileges === 'limited'}
        error={error}
        onRefresh={() => void loadGallery()}
        onSelectMore={() => void handleSelectMore()}
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
    paddingHorizontal: 20,
    paddingTop: 8,
  },
});
