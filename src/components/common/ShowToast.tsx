import { toast } from "react-toastify";
import Icon from "./Icon";

export const showWarnToast = (message: string) =>
  toast.warn(message, {
    icon: <Icon width="22px" height="18px" left="-857px" top="-828px" />,
  });

export const showErrorToast = (message: string) =>
  toast.error(message, {
    icon: <Icon width="20px" height="20px" left="-887px" top="-827px" />,
  });

export const showSuccessToast = (message: string) =>
  toast.success(message, {
    icon: <Icon width="22px" height="22px" left="-917px" top="-826px" />,
  });
