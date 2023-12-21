import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface ballProps {
  ballLeft: number;
  ballBottom: number;
  gravity: number;
}

const Ball: React.FC<ballProps> = ({ballLeft, ballBottom, gravity}) => {
  let ballWidth: number = 60;
  return (
    <View
      style={{
        position: 'absolute',
        height: 60,
        width: ballWidth,
        borderRadius: 30,
        backgroundColor: 'black',
        left: ballLeft - ballWidth / 2,
        bottom: ballBottom,
      }}
    />
  );
};

export default Ball;

const styles = StyleSheet.create({});
