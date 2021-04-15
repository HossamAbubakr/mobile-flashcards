import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "FlashCards:notifications";

export async function clearLocalNotification() {
  const result = await AsyncStorage.removeItem(NOTIFICATION_KEY);
  return Notifications.cancelAllScheduledNotificationsAsync(result);
}

function createNotification() {
  return {
    title: "Log your stats!",
    body: "👋 don't forget to log your stats for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  };
}

export async function setLocalNotification() {
  const storedNotifics = await AsyncStorage.getItem(NOTIFICATION_KEY);
  const notifics = JSON.parse(storedNotifics);
  if (notifics === null) {
    const premission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (premission.status === "granted") {
      Notifications.cancelAllScheduledNotificationsAsync();
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(20);
      tomorrow.setMinutes(0);
      // I had to set the content and trigger attributes as the Udacity example no longer works
      // Ref : https://docs.expo.io/versions/latest/sdk/notifications/#schedulenotificationasyncnotificationrequest-notificationrequestinput-promisestring
      Notifications.scheduleNotificationAsync({
        content: createNotification(),
        trigger: tomorrow,
      });
      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
}
