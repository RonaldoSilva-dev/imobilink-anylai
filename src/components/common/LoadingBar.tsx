import React from "react"
import { useLoading } from "../../contexts/LoadingContext"

const LoadingBar: React.FC = () => {
  const { loading } = useLoading()

  if (!loading) return null

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "4px",
      backgroundColor: "transparent",
      zIndex: 9999,
      overflow: "hidden"
    }}>
      <div style={{
        height: "100%",
        width: "100%",
        background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #10b981, #3b82f6)",
        backgroundSize: "400% 100%",
        animation: "shimmer 1.5s ease-in-out infinite",
        transform: "translateX(-100%)",
        animationName: "loadingShimmer"
      }} />
      
      <style>
        {`
          @keyframes loadingShimmer {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}
      </style>
    </div>
  )
}

export default LoadingBar