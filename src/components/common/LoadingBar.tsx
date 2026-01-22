import React from "react";
import { useLoading } from "../../contexts/loadingContext";

const LoadingBar: React.FC = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-gray-100/20 overflow-hidden">
      <div
        className="h-full w-full animate-progress-infinite 
                   bg-[linear-gradient(90deg,#3b82f6_0%,#a855f7_25%,#10b981_50%,#3b82f6_75%,#a855f7_100%)] 
                   bg-[length:200%_100%]"
      />
    </div>
  );
};
export default LoadingBar;
