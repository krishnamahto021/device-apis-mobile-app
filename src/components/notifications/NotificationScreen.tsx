import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { NotificationControlMenu } from '@/components/notifications/NotificationControlMenu';
import { NotificationStatusCard } from '@/components/notifications/NotificationStatusCard';
import { NotificationTopBar } from '@/components/notifications/NotificationTopBar';
import { colors } from '@/theme/colors';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldShowList: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
  }),
});

async function ensureNotificationPermission() {
  const { granted } = await Notifications.getPermissionsAsync();
  if (granted) {
    return true;
  }

  const { granted: requested } = await Notifications.requestPermissionsAsync();
  return requested;
}

export function NotificationScreen() {
  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [lastNotificationTitle, setLastNotificationTitle] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const granted = await ensureNotificationPermission();
      setPermissionGranted(granted);
    })();

    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      const { title, body, data } = notification.request.content;
      setLastNotificationTitle(title ?? body ?? null);
      console.log('Notification received:', { title, body, data });
    });

    return () => subscription.remove();
  }, []);

  const scheduleInstant = useCallback(async () => {
    const allowed = await ensureNotificationPermission();
    setPermissionGranted(allowed);
    if (!allowed) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Radha wallabh sri harivansh !',
        body: 'Sri brindawan sri van chandran',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  }, []);

  const scheduleWithRouter = useCallback(async () => {
    const allowed = await ensureNotificationPermission();
    setPermissionGranted(allowed);
    if (!allowed) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Radhe Radhe !',
        subtitle: 'Sri Harivansh',
        body: 'sri vrindawan sri vanchandra',
        data: {
          screen: '/profile',
          userId: 42,
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  }, []);

  const scheduleDaily = useCallback(async () => {
    const allowed = await ensureNotificationPermission();
    setPermissionGranted(allowed);
    if (!allowed) {
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '11 mala',
        body: 'keep doing it ',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: 9,
        minute: 30,
      },
    });
  }, []);

  const clearNotifications = useCallback(async () => {
    await Notifications.dismissAllNotificationsAsync();
  }, []);

  return (
    <View style={styles.root}>
      <NotificationTopBar />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <NotificationStatusCard
          permissionGranted={permissionGranted}
          lastNotificationTitle={lastNotificationTitle}
        />
      </ScrollView>

      <NotificationControlMenu
        permissionGranted={permissionGranted === true}
        onInstant={() => void scheduleInstant()}
        onRouter={() => void scheduleWithRouter()}
        onDaily={() => void scheduleDaily()}
        onClear={() => void clearNotifications()}
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
  },
});
