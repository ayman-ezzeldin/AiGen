import ToggleSwitch from "../components/ToggleSwitch";
import { useDispatch, useSelector } from "react-redux";
import { updateNotifications } from "../../store/profile/settingsSlice";

const Notifications = () => {
  const notifications = useSelector((state) => state.settings.notifications);
  const dispatch = useDispatch();

  const handleToggle = (setting) => {
    dispatch(updateNotifications({ [setting]: !notifications[setting] }));
  };

  return (
    <div className="space-y-6">
      <ToggleSwitch
        label="Allow in-app notificationsh"
        description="These are notifications that are delivered within the app."
        value={notifications.inApp}
        onChange={() => handleToggle("inApp")}
      />
      <ToggleSwitch
        label="Allow Push notifications"
        description="These are notifications that are pushed to your device immediately"
        value={notifications.push}
        onChange={() => handleToggle("push")}
      />
      <ToggleSwitch
        label="Allow email notifications"
        description="These are notifications that are sent primarily to your email."
        value={notifications.email}
        onChange={() => handleToggle("email")}
      />
    </div>
  );
};

export default Notifications;
