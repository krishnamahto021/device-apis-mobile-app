export const GALLERY_COLUMNS = 3;
export const GALLERY_PAGE_SIZE = 50;

export const galleryCopy = {
  header: {
    title: 'Gallery',
    subtitle: '写真を見る',
  },
  loading: {
    title: 'Checking permission',
    subtitle: '写真ライブラリの許可を確認中…',
    accessibilityLabel: 'Checking photo library permission',
  },
  permission: {
    title: 'Photo Library Access',
    body: 'We need access to browse photos on your device.',
    subtitle: 'ギャラリーを表示するには写真へのアクセスが必要です',
    grantLabel: 'Grant Photo Access',
    settingsLabel: 'Open Settings',
    grantHint: 'Requests photo library access from the system',
    settingsHint: 'Opens app settings so you can enable photo library access',
  },
  grid: {
    emptyTitle: 'No photos found',
    emptySubtitle: 'この端末に表示できる写真がありません',
    photoCount: (count: number) => `${count} photo${count === 1 ? '' : 's'}`,
    accessLabel: (access: string) => `Access: ${access}`,
  },
  menu: {
    actionsSection: 'Actions',
    statusSection: 'Status',
    refresh: 'Refresh Gallery',
    refreshHint: 'Reloads photos from your device library',
    selectMore: 'Select More Photos',
    selectMoreHint: 'Opens the system picker to grant access to additional photos',
  },
  status: {
    loadError: 'Could not load photos from the gallery.',
    refreshing: 'Refreshing gallery…',
  },
} as const;
