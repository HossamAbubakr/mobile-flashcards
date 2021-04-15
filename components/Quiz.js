import TextButton from "./TextButton";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { setLocalNotification, clearLocalNotification } from "../utils/helpers";

export default function Quiz(props) {
  const [correct, setCorrect] = useState(0);

  const [questionIndex, setIndex] = useState(0);

  useEffect(() => {
    const asyncDeckNotification = async () => {
      await clearLocalNotification();
      await setLocalNotification();
    };
    asyncDeckNotification();
  }, []);

  const onAnswer = (correctAnswer) => {
    if (correctAnswer) {
      setCorrect(correct + 1);
    }
    setIndex(questionIndex + 1);
  };

  const onReveal = (answer) => {
    Alert.alert("The Answer", answer);
  };

  const { questions } = props.route.params;

  const question = questions[questionIndex];

  if (questionIndex === questions.length) {
    return (
      <View style={styles.deck}>
        <Text style={styles.text}>
          You answered {correct} questions out of {questions.length} correctly.
        </Text>
        <TextButton style={styles.button} onPress={() => props.navigation.goBack()}>
          Go Back
        </TextButton>
      </View>
    );
  }
  return (
    <View style={styles.deck}>
      <Text style={styles.text}>{question.question}</Text>
      <TextButton style={styles.button} onPress={() => onReveal(question.answer)}>
        Reveal Answer
      </TextButton>
      <TextButton style={[styles.button, { backgroundColor: "#00b300" }]} onPress={() => onAnswer(true)}>
        Correct
      </TextButton>
      <TextButton style={[styles.button, { backgroundColor: "#b30000" }]} onPress={() => onAnswer(false)}>
        Wrong
      </TextButton>
      <Text style={{ color: "#800000", paddingTop: 10 }} onPress={() => props.navigation.goBack()}>
        Return
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  deck: {
    marginTop: 80,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    margin: 20,
    fontSize: 25,
  },
  button: {
    fontSize: 20,
    marginTop: 12,
    margin: 5,
    backgroundColor: "#808080",
    color: "#000000",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  subText: {
    fontSize: 18,
    textAlign: "center",
  },
});
