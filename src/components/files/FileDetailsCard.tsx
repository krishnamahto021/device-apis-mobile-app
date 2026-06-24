import { StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { filesCopy } from '@/constants/files';
import { FileDetails } from '@/hooks/useFilePicker';
import { colors } from '@/theme/colors';

type FileDetailsCardProps = {
  selected: FileDetails | null;
};

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text selectable style={styles.rowValue}>
        {value}
      </Text>
    </View>
  );
}

export function FileDetailsCard({ selected }: FileDetailsCardProps) {
  if (!selected) {
    return (
      <View style={styles.card} accessibilityRole="summary">
        <Text style={styles.kanji}>未</Text>
        <SectionDivider />
        <Text style={styles.emptyTitle}>{filesCopy.details.emptyTitle}</Text>
        <Text style={styles.emptySubtitle}>{filesCopy.details.emptySubtitle}</Text>
      </View>
    );
  }

  return (
    <View style={styles.card} accessibilityRole="summary">
      <Text style={styles.kanji}>詳</Text>
      <SectionDivider />
      <Text style={styles.fileName}>{selected.name}</Text>

      <View style={styles.metaBlock}>
        <DetailRow label={filesCopy.details.type} value={selected.mimeType} />
        <DetailRow label={filesCopy.details.size} value={selected.size} />
        <DetailRow
          label={filesCopy.details.readable}
          value={selected.exists ? filesCopy.details.yes : filesCopy.details.no}
        />
        <DetailRow label={filesCopy.details.path} value={selected.uri} />
      </View>

      {selected.textPreview && (
        <>
          <SectionDivider />
          <Text style={styles.previewLabel}>{filesCopy.details.preview}</Text>
          <Text selectable style={styles.previewText}>
            {selected.textPreview}
          </Text>
        </>
      )}
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
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  kanji: {
    fontSize: 42,
    color: colors.vermillion,
    fontWeight: '300',
    letterSpacing: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyTitle: {
    marginTop: 8,
    fontSize: 18,
    color: colors.indigo,
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    textAlign: 'center',
  },
  fileName: {
    marginTop: 4,
    fontSize: 18,
    color: colors.indigo,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  metaBlock: {
    marginTop: 16,
    gap: 10,
  },
  row: {
    gap: 4,
  },
  rowLabel: {
    fontSize: 11,
    color: colors.ink,
    opacity: 0.6,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  rowValue: {
    fontSize: 13,
    color: colors.ink,
    lineHeight: 18,
  },
  previewLabel: {
    marginTop: 4,
    fontSize: 11,
    color: colors.ink,
    opacity: 0.6,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  previewText: {
    marginTop: 8,
    fontSize: 12,
    color: colors.ink,
    lineHeight: 18,
    backgroundColor: colors.washi,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    padding: 12,
  },
});
