export type PickMode = 'any' | 'image' | 'pdf';

export const FILE_MODES: { id: PickMode; label: string; type: string }[] = [
  { id: 'any', label: 'Any', type: '*/*' },
  { id: 'image', label: 'Images', type: 'image/*' },
  { id: 'pdf', label: 'PDF', type: 'application/pdf' },
];

export const filesCopy = {
  header: {
    title: 'Files',
    subtitle: 'ファイルを選ぶ',
  },
  mode: {
    title: 'File type filter',
    subtitle: 'ピックするファイルの種類',
  },
  details: {
    title: 'File details',
    emptyTitle: 'No file selected',
    emptySubtitle: '下のボタンからファイルを選んでください',
    name: 'Name',
    type: 'Type',
    size: 'Size',
    readable: 'Readable',
    path: 'Path',
    preview: 'Preview',
    yes: 'Yes',
    no: 'No',
    unknown: 'Unknown',
  },
  list: {
    title: 'Selected files',
    empty: 'No files picked yet.',
  },
  menu: {
    actionsSection: 'Actions',
    optionsSection: 'Options',
    statusSection: 'Status',
    pick: 'Pick File',
    picking: 'Opening picker…',
    pickHint: 'Opens the system document picker with the selected filter',
    multiple: 'Pick multiple files',
    multipleHint: 'Allows selecting more than one file at once',
  },
  status: {
    canceled: 'Canceled — no file chosen.',
    selected: (count: number) => `${count} file${count === 1 ? '' : 's'} selected.`,
  },
  errors: {
    pick: 'Could not open the document picker.',
    read: 'Could not read the selected file.',
  },
} as const;
