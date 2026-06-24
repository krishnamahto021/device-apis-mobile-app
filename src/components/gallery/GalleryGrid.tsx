import * as MediaLib from 'expo-media-library';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';

import { SectionDivider } from '@/components/ui/SectionDivider';
import { GALLERY_COLUMNS, galleryCopy } from '@/constants/gallery';
import { colors } from '@/theme/colors';

type GalleryGridProps = {
  assets: MediaLib.Asset[];
  loading: boolean;
  accessPrivileges: MediaLib.PermissionResponse['accessPrivileges'];
};

export function GalleryGrid({ assets, loading, accessPrivileges }: GalleryGridProps) {
  if (loading && assets.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.vermillion} />
      </View>
    );
  }

  if (assets.length === 0) {
    return (
      <View style={styles.emptyCard} accessibilityRole="summary">
        <Text style={styles.kanji}>空</Text>
        <SectionDivider />
        <Text style={styles.emptyTitle}>{galleryCopy.grid.emptyTitle}</Text>
        <Text style={styles.emptySubtitle}>{galleryCopy.grid.emptySubtitle}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{galleryCopy.grid.photoCount(assets.length)}</Text>
        <Text style={styles.metaText}>{galleryCopy.grid.accessLabel(accessPrivileges ?? 'unknown')}</Text>
      </View>

      <FlatList
        data={assets}
        keyExtractor={(item) => item.id}
        numColumns={GALLERY_COLUMNS}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.thumbnail} accessibilityIgnoresInvertColors />
        )}
      />

      {loading && (
        <View style={styles.refreshOverlay}>
          <ActivityIndicator size="small" color={colors.vermillion} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.paper,
    borderWidth: 1,
    borderColor: colors.washiDeep,
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  kanji: {
    fontSize: 42,
    color: colors.vermillion,
    fontWeight: '300',
    letterSpacing: 4,
    marginBottom: 8,
  },
  emptyTitle: {
    marginTop: 8,
    fontSize: 20,
    color: colors.indigo,
    fontWeight: '600',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 12,
    color: colors.ink,
    opacity: 0.55,
    textAlign: 'center',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  metaText: {
    fontSize: 12,
    color: colors.ink,
    opacity: 0.7,
    letterSpacing: 0.4,
  },
  listContent: {
    paddingBottom: 8,
    gap: 4,
  },
  row: {
    gap: 4,
  },
  thumbnail: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.washiDeep,
    borderWidth: 1,
    borderColor: colors.washiDeep,
  },
  refreshOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.topBarBg,
    borderWidth: 1,
    borderColor: colors.topBarBorder,
    padding: 8,
  },
});
