import React from "react";
import { useLoading } from "../../contexts/loadingContext";

const LoadingBar: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 overflow-hidden">
      <div className="h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 to-400% animate-[shimmer_1.5s_ease-in-out_infinite] -translate-x-full" />
    </div>
  );
};

export default LoadingBar;
