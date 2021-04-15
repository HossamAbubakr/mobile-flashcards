import TextButton from "./TextButton";
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import { submitDeck } from "../utils/api";
import { addDeck } from "../actions/index";

function NewDeck(props) {
  const [deckTitle, setTitle] = useState("");

  const onChange = (deckTitle) => {
    setTitle(deckTitle);
  };

  const onSubmit = async () => {
    const { dispatch, decks } = props;

    if (deckTitle.trim()) {
      const title = deckTitle.charAt(0).toUpperCase() + deckTitle.slice(1);
      if (decks[title]) {
        Alert.alert("Duplication Error", "A deck with this title already exists.");
      } else {
        await submitDeck(title);
        await dispatch(addDeck(title));
        props.navigation.navigate("Deck", { title });
      }
    } else {
      Alert.alert("Empty Field", "The title field can't be empty.");
    }
  };

  return (
    <View style={styles.deck}>
      <Text style={styles.text}>What's The Title Of Your New Deck?</Text>
      <TextInput style={styles.input} onChangeText={onChange} placeholder="Science" />
      <TextButton style={styles.button} onPress={onSubmit}>
        Add Deck
      </TextButton>
    </View>
  );
}
function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(NewDeck);

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
