import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { useCallback, useState } from 'react';

import { FILE_MODES, PickMode, filesCopy } from '@/constants/files';
import { formatBytes } from '@/utils/formatBytes';
import { getErrorMessage } from '@/utils/errors';

export type FileDetails = {
  name: string;
  mimeType: string;
  size: string;
  exists: boolean;
  uri: string;
  textPreview?: string;
};

function isTextFile(asset: DocumentPicker.DocumentPickerAsset): boolean {
  return (
    asset.mimeType?.startsWith('text/') === true ||
    asset.name.endsWith('.txt') ||
    asset.name.endsWith('.json') ||
    asset.name.endsWith('.md')
  );
}

export function useFilePicker() {
  const [mode, setMode] = useState<PickMode>('any');
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [files, setFiles] = useState<DocumentPicker.DocumentPickerAsset[]>([]);
  const [selected, setSelected] = useState<FileDetails | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [picking, setPicking] = useState(false);

  const inspectFile = useCallback(async (asset: DocumentPicker.DocumentPickerAsset) => {
    setError(null);

    try {
      const file = new File(asset.uri);
      const info = file.info();

      let textPreview: string | undefined;
      if (isTextFile(asset) && info.exists) {
        textPreview = (await file.text()).slice(0, 240);
      }

      setSelected({
        name: asset.name,
        mimeType: asset.mimeType ?? filesCopy.details.unknown,
        size: formatBytes(asset.size),
        exists: info.exists,
        uri: asset.uri,
        textPreview,
      });
    } catch (readError) {
      setError(getErrorMessage(readError, filesCopy.errors.read));
    }
  }, []);

  const pickDocuments = useCallback(async () => {
    const selectedMode = FILE_MODES.find((item) => item.id === mode) ?? FILE_MODES[0];

    setPicking(true);
    setError(null);

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: selectedMode.type,
        multiple: allowMultiple,
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        setStatus(filesCopy.status.canceled);
        return;
      }

      setFiles(result.assets);
      setStatus(filesCopy.status.selected(result.assets.length));
      await inspectFile(result.assets[0]);
    } catch (pickError) {
      setError(getErrorMessage(pickError, filesCopy.errors.pick));
    } finally {
      setPicking(false);
    }
  }, [allowMultiple, inspectFile, mode]);

  return {
    mode,
    setMode,
    allowMultiple,
    setAllowMultiple,
    files,
    selected,
    status,
    error,
    picking,
    pickDocuments,
    inspectFile,
  };
}
