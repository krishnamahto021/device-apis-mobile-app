import * as DocumentPicker from 'expo-document-picker';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { filesCopy } from '@/constants/files';
import { colors } from '@/theme/colors';
import { formatBytes } from '@/utils/formatBytes';

type FileListCardProps = {
  files: DocumentPicker.DocumentPickerAsset[];
  selectedUri?: string;
  onSelect: (asset: DocumentPicker.DocumentPickerAsset) => void;
};

export function FileListCard({ files, selectedUri, onSelect }: FileListCardProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <View style={styles.card} accessibilityRole="list">
      <Text style={styles.title}>{filesCopy.list.title}</Text>
      <SectionDivider />

      <View style={styles.list}>
        {files.map((file, index) => {
          const active = selectedUri === file.uri;

          return (
            <Pressable
              key={`${file.uri}-${index}`}
              onPress={() => onSelect(file)}
              style={[styles.item, active && styles.itemActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={styles.itemName}>{file.name}</Text>
              <Text style={styles.itemMeta}>{formatBytes(file.size)}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.indigo,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  list: {
    marginTop: 8,
    gap: 8,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    backgroundColor: colors.washi,
  },
  itemActive: {
    borderColor: colors.gold,
    backgroundColor: colors.paper,
  },
  itemName: {
    fontSize: 14,
    color: colors.indigo,
    fontWeight: '600',
  },
  itemMeta: {
    marginTop: 4,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.6,
  },
});
