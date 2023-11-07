import React, { useState } from "react";
import { ScrollView } from "react-native";

function useHandleScrollFunc() {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [previousHeight, SetPreviousHeight] = useState(0);

  const handleScroll = (event) => {
    // const previousScrollY = event.nativeEvent.contentOffset.y;
    const currentScrollY = event.nativeEvent.contentOffset.y;

    if (currentScrollY > previousHeight) {
      console.log("scrolling");
      setIsScrollingUp(true);

      setTimeout(() => {
        setIsScrollingUp(false);
      }, 1000);
    } else {
      console.log("not scrolling");
      setIsScrollingUp(false);
    }
    SetPreviousHeight(currentScrollY);
  };

  return [isScrollingUp, handleScroll];
}

export default useHandleScrollFunc;
