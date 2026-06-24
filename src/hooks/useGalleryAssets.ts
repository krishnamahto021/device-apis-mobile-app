import * as MediaLib from 'expo-media-library';
import { useCallback, useEffect, useState } from 'react';

import { GALLERY_PAGE_SIZE, galleryCopy } from '@/constants/gallery';
import { getErrorMessage } from '@/utils/errors';

export function useGalleryAssets() {
  const [permission, requestPermission] = MediaLib.usePermissions();
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<MediaLib.Asset[]>([]);
  const [error, setError] = useState<string | null>(null);

  const loadGallery = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!permission?.granted) {
        const result = await requestPermission();
        if (!result.granted) {
          return;
        }
      }

      const page = await MediaLib.getAssetsAsync({
        first: GALLERY_PAGE_SIZE,
        mediaType: MediaLib.MediaType.photo,
        sortBy: [[MediaLib.SortBy.creationTime, false]],
      });

      setAssets(page.assets);
    } catch (loadError) {
      setError(getErrorMessage(loadError, galleryCopy.status.loadError));
    } finally {
      setLoading(false);
    }
  }, [permission?.granted, requestPermission]);

  useEffect(() => {
    if (permission?.granted) {
      void loadGallery();
    }
  }, [permission?.granted, loadGallery]);

  return {
    permission,
    requestPermission,
    loading,
    assets,
    error,
    loadGallery,
  };
}
