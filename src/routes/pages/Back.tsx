import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function Back() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(-1);
  }, [navigate]);
  return <></>;
}
