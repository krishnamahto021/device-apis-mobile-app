export const notificationsCopy = {
  header: {
    title: 'Notifications',
    subtitle: 'お知らせを試す',
  },
  status: {
    permission: 'Permission',
    granted: 'Allowed',
    denied: 'Denied',
    dailyReminder: 'Daily reminder',
    dailyTime: '9:30 AM',
    lastReceived: 'Last received',
    none: 'None yet',
    hint: 'Instant alerts appear after two seconds. Daily reminders repeat each morning.',
  },
  menu: {
    scheduleSection: 'Schedule',
    manageSection: 'Manage',
    instant: 'Instant Alert',
    instantHint: 'Schedules a local notification after two seconds',
    router: 'Deep Link Alert',
    routerHint: 'Notification with screen routing data attached',
    daily: 'Daily Reminder',
    dailyHint: 'Repeats every day at 9:30 AM',
    clear: 'Clear All',
    clearHint: 'Dismisses all visible notifications from the tray',
    permissionDenied: 'Allow notifications to schedule alerts on this device.',
  },
} as const;
