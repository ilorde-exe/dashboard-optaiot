export const playNotificationSound = () => {
  const audio = new Audio("/notification.mp3");
  audio.play();
};
