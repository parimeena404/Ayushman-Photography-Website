import 'framer-motion';
import React from 'react';

declare module 'framer-motion' {
  export interface MotionStyle extends React.CSSProperties {
    [key: string]: any;
  }
}
