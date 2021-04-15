import TextButton from "./TextButton";
import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, Animated, Alert } from "react-native";
import { connect } from "react-redux";
import { removeDeck } from "../utils/api";
import { deleteDeck } from "../actions/index";

function Deck(props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const onDelete = async () => {
    const { dispatch, deck } = props;
    const { title } = deck;
    await removeDeck(title);
    await dispatch(deleteDeck(title));
    props.navigation.goBack();
  };

  const onQuiz = () => {
    const { questions } = props.deck;
    if (questions.length > 0) {
      props.navigation.navigate("Quiz", { questions });
    } else {
      Alert.alert("Empty Deck", "Can't start a quiz on an empty deck");
    }
  };

  if (props.deleted) {
    return null;
  }

  const { deck } = props;
  return (
    <Animated.View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
      <View style={styles.deck}>
        <Text style={styles.text}>{deck.title}</Text>
        <Text style={styles.subText}>{deck.questions.length} Cards</Text>
        <TextButton style={styles.button} onPress={() => props.navigation.navigate("Card", { title: deck.title })}>
          Add Card
        </TextButton>
        <TextButton style={styles.button} onPress={onQuiz}>
          Start Quiz
        </TextButton>
        <Text style={{ color: "#800000", paddingTop: 10 }} onPress={onDelete}>
          Delete Deck
        </Text>
      </View>
    </Animated.View>
  );
}

function mapStateToProps(decks, { route }) {
  const { title } = route.params;
  const deck = decks[title];
  return {
    deck,
    deleted: deck === undefined,
  };
}

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  deck: {
    marginTop: 80,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
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
