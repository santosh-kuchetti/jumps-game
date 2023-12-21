import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface obstracleProps {
  obstracleLeft: number;
  obstracleWidth: number;
  obstracleHeight: number;
  gap: number;
  color: string;
  randomHeight: number;
}

const Obstracle: React.FC<obstracleProps> = ({
  obstracleLeft,
  obstracleWidth,
  obstracleHeight,
  gap,
  color,
  randomHeight,
}) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          height: obstracleHeight,
          width: obstracleWidth,
          backgroundColor: color,
          left: obstracleLeft,
          bottom: randomHeight + obstracleHeight + gap,
        }}
      />
      <View
        style={{
          position: 'absolute',
          height: obstracleHeight,
          width: obstracleWidth,
          backgroundColor: color,
          left: obstracleLeft,
          bottom: 0,
        }}
      />
    </>
  );
};

export default Obstracle;

const styles = StyleSheet.create({});
