import { StyledToastContainer } from "./components/common/ToastStyle";
import Router from "./routes";
export default function App() {
  return (
    <>
      <Router />
      <StyledToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick
      />
    </>
  );
}
