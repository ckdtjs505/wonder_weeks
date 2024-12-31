import { Slot } from 'expo-router';

import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function Root() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('알림 권한이 거부되었습니다!');
      }
    })();

    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    });
    console.log(subscription)

    return () => {
      subscription.remove();
    };
  }, []);


  return (
      <Slot />
  );
}