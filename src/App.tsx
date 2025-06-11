import { ToastContainer } from "react-toastify";
import Router from "./routes";
export default function App() {
  return (
    <>
      <Router />
      <ToastContainer position="bottom-right" autoClose={3000} closeOnClick />
    </>
  );
}
