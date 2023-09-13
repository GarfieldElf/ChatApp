// RootNavigation.js
import {createNavigationContainerRef } from '@react-navigation/native';
import React from "react";

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}



