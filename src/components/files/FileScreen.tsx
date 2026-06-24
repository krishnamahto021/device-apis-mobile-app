import { ScrollView, StyleSheet, View } from 'react-native';

import { FileControlMenu } from '@/components/files/FileControlMenu';
import { FileDetailsCard } from '@/components/files/FileDetailsCard';
import { FileListCard } from '@/components/files/FileListCard';
import { FileModeSelector } from '@/components/files/FileModeSelector';
import { FileTopBar } from '@/components/files/FileTopBar';
import { useFilePicker } from '@/hooks/useFilePicker';
import { colors } from '@/theme/colors';

export function FileScreen() {
  const {
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
  } = useFilePicker();

  return (
    <View style={styles.root}>
      <FileTopBar />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <FileModeSelector mode={mode} onModeChange={setMode} />
        <FileDetailsCard selected={selected} />
        <FileListCard
          files={files}
          selectedUri={selected?.uri}
          onSelect={(asset) => void inspectFile(asset)}
        />
      </ScrollView>

      <FileControlMenu
        allowMultiple={allowMultiple}
        picking={picking}
        status={status}
        error={error}
        onAllowMultipleChange={setAllowMultiple}
        onPick={() => void pickDocuments()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.washi,
  },
  scroll: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 16,
  },
});
