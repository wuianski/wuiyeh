"use client";

import { useState, useEffect } from "react";

const useWindowWidth = () => {
  // Initialize state with a default value (e.g., 0 or undefined)
  // to avoid hydration errors during the initial server render
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // This code only runs on the client side, where 'window' is defined
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set the initial width
    handleResize();

    // Add event listener for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures effect runs only once on mount

  return windowWidth;
};

export default useWindowWidth;
