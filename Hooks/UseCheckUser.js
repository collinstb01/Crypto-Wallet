import React from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

function UseCheckUser() {
  const [userFromLS, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    setLoading(true);
    let user = await AsyncStorage.getItem("user");
    setUser(user);
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);

  return [userFromLS, loading];
}

export default UseCheckUser;
