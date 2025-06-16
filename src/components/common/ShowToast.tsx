import { toast } from "react-toastify";
import Icon from "./Icon";

const getIsDarkMode = () => document.documentElement.classList.contains("dark");

const darkToastStyle = {
  backgroundColor: "var(--dark-bg-secondary)",
  color: "var(--dark-gray-700)",
};

export const showWarnToast = (message: string) => {
  const isDarkMode = getIsDarkMode();
  toast.warn(message, {
    icon: <Icon width="22px" height="18px" left="-857px" top="-828px" />,
    style: isDarkMode ? darkToastStyle : {},
  });
};

export const showErrorToast = (message: string) => {
  const isDarkMode = getIsDarkMode();
  toast.error(message, {
    icon: <Icon width="20px" height="20px" left="-887px" top="-827px" />,
    style: isDarkMode ? darkToastStyle : {},
  });
};

export const showSuccessToast = (message: string) => {
  const isDarkMode = getIsDarkMode();
  toast.success(message, {
    icon: <Icon width="22px" height="22px" left="-917px" top="-826px" />,
    style: isDarkMode ? darkToastStyle : {},
  });
};
