import TextButton from "./TextButton";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import { submitCard } from "../utils/api";
import { addCard } from "../actions/index";

function NewCard(props) {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const onQuestionChange = (question) => {
    setQuestion(question);
  };

  const onAnswerChange = (answer) => {
    setAnswer(answer);
  };

  const onSubmit = async () => {
    const { dispatch } = props;
    const { title } = props.route.params;
    if (question.trim() && answer.trim()) {
      await submitCard(title, { question, answer });
      await dispatch(addCard(title, { question, answer }));
      props.navigation.goBack();
    } else {
      Alert.alert("Empty Field(s)", "The question and answer fields can't be empty.");
    }
  };

  return (
    <View style={styles.deck}>
      <Text style={styles.text}>What's The Question?</Text>
      <TextInput style={styles.input} onChangeText={onQuestionChange} placeholder="Which King Is Dubbed The Golden King?" />
      <Text style={styles.text}>What's The Answer?</Text>
      <TextInput style={styles.input} onChangeText={onAnswerChange} placeholder="Tutankhamun" />
      <TextButton style={styles.button} onPress={onSubmit}>
        Add Card
      </TextButton>
    </View>
  );
}

export default connect(null)(NewCard);

const styles = StyleSheet.create({
  deck: {
    marginTop: 80,
  },
  input: {
    padding: 10,
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 30,
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
});
