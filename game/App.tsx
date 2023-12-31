/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Ball from './components/Ball';
import Obstracle from './components/Obstracle';
const reload = require('./assets/images/reload.png');

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const width: number = Dimensions.get('window').width;
  const height: number = Dimensions.get('window').height;
  const isFirstRender = useRef(true);
  const ballLeft: number = width / 2;

  const [ballBottom, setBallBottom] = useState<number>(height / 2);
  const [obstracleOneLeft, setObstracleOneLeft] = useState<number>(width);
  const [obstracleTwoLeft, setObstracleTwoLeft] = useState<number>(
    width + width / 2 + 30,
  );

  const [obstracleOneNegHeight, setObstracleOneNegHeight] = useState(0);
  const [obstracleTwoNegHeight, setObstracleTwoNegHeight] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

  const gravity: number = 3;
  let gravityId: NodeJS.Timeout;
  let obstracleOneLeftId: NodeJS.Timeout;
  let obstracleTwoLeftId: NodeJS.Timeout;

  let obstracleWidth: number = 60;
  let obstracleHeight: number = 300;
  let gap = 200;

  useEffect(() => {
    if (ballBottom > 0) {
      gravityId = setInterval(() => {
        setBallBottom(prev => prev - gravity);
      }, 30);
    }

    return () => {
      clearInterval(gravityId);
    };
  }, [ballBottom]);

  const jump = () => {
    if (!isGameOver && ballBottom < height) {
      setBallBottom(prev => prev + 50);
    }
  };

  useEffect(() => {
    if (obstracleOneLeft > -obstracleWidth) {
      obstracleOneLeftId = setInterval(() => {
        setObstracleOneLeft(prev => prev - 5);
      }, 30);
      return () => {
        clearInterval(obstracleOneLeftId);
      };
    } else {
      setObstracleOneLeft(width);
      setObstracleOneNegHeight(Math.random() * 100);
    }
  }, [obstracleOneLeft]);

  useEffect(() => {
    if (obstracleTwoLeft > -obstracleWidth) {
      obstracleTwoLeftId = setInterval(() => {
        setObstracleTwoLeft(prev => prev - 5);
      }, 30);
      return () => {
        clearInterval(obstracleTwoLeftId);
      };
    } else {
      setObstracleTwoLeft(width);
      setObstracleTwoNegHeight(Math.random() * 100);
    }
  }, [obstracleTwoLeft]);

  const restartGame = () => {
    setBallBottom(height / 2);
    setObstracleOneLeft(width);
    setObstracleTwoLeft(width + width / 2 + 30);
    setObstracleOneNegHeight(0);
    setObstracleTwoNegHeight(0);
    setIsGameOver(false);
  };

  const gameOver = () => {
    clearInterval(gravityId);
    clearInterval(obstracleOneLeftId);
    clearInterval(obstracleTwoLeftId);
    setIsGameOver(true);
  };

  useEffect(() => {
    if (
      ((ballBottom < obstracleOneNegHeight + obstracleHeight + 30 ||
        ballBottom > obstracleOneNegHeight + obstracleHeight + gap) &&
        obstracleOneLeft > width / 2 - 30 &&
        obstracleOneLeft < width / 2 + 30) ||
      ((ballBottom < obstracleTwoNegHeight + obstracleHeight + 30 ||
        ballBottom > obstracleTwoNegHeight + obstracleHeight + gap) &&
        obstracleTwoLeft > width / 2 - 30 &&
        obstracleTwoLeft < width / 2 + 30)
    ) {
      gameOver();
    }
  });

  return (
    <TouchableWithoutFeedback onPress={() => jump()}>
      <SafeAreaView style={styles.container}>
        <Ball ballLeft={ballLeft} ballBottom={ballBottom} gravity={gravity} />
        <Obstracle
          obstracleLeft={obstracleOneLeft}
          obstracleWidth={obstracleWidth}
          obstracleHeight={obstracleHeight}
          gap={gap}
          color="black"
          randomHeight={obstracleOneNegHeight}
        />
        <Obstracle
          obstracleLeft={obstracleTwoLeft}
          obstracleWidth={obstracleWidth}
          obstracleHeight={obstracleHeight}
          gap={gap}
          color="green"
          randomHeight={obstracleTwoNegHeight}
        />
        {isGameOver && (
          <TouchableOpacity onPress={restartGame}>
            <Image source={reload} />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
