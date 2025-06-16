import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 1rem;
    border: 1px solid var(--primary-pink-point);
    color: var(--gray-700);
    padding: 12px 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 15px;
    overflow: hidden;
  }

  .Toastify__progress-bar {
    background: var(--primary-pink-point) !important;
  }

  .Toastify__progress-bar--default,
  .Toastify__progress-bar--warn,
  .Toastify__progress-bar--error,
  .Toastify__progress-bar--info,
  .Toastify__progress-bar--success {
    background-color: var(--primary-pink-point) !important;
    background-image: none !important;
  }
`;
