import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { loadDecks } from "../utils/api";
import { receiveDecks } from "../actions/index";

function DeckList(props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const asyncDeckFetch = async () => {
      const { dispatch } = props;
      const decks = await loadDecks();
      await dispatch(receiveDecks(decks));
      setReady(true);
    };
    asyncDeckFetch();
  }, []);

  if (!ready) {
    return <Text>Loading...</Text>;
  }

  if (!props.decks.length) {
    return (
      <View style={styles.decks}>
        <Text style={styles.text}>You don't have any decks, please add some.</Text>
      </View>
    );
  }

  return (
    <View style={styles.deck}>
      {props.decks.map(
        (deck, index) =>
          deck.title !== undefined && (
            <View key={index}>
              <Text style={styles.text} onPress={() => props.navigation.navigate("Deck", { title: deck.title })}>
                {deck.title}
              </Text>
              <Text style={styles.subText}>{deck.questions === undefined ? "0" : deck.questions.length} Cards</Text>
            </View>
          )
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  deck: {
    marginTop: 12,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    marginTop: 30,
  },
  subText: {
    fontSize: 18,
    textAlign: "center",
  },
});

function mapStateToProps(decks) {
  return {
    decks: Object.values(decks),
  };
}

export default connect(mapStateToProps)(DeckList);
