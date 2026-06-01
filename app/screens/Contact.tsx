import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Contact() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact</Text>

      <Text style={styles.intro}>
        Pour toute remarque, correction ou proposition de participation à
        l'élaboration du dictionnaire :
      </Text>

      <View style={styles.card}>
        <Text style={styles.orgName}>
          Association franco-estonienne de lexicographie
        </Text>
        <Text style={styles.line}>Lossi 3-404</Text>
        <Text style={styles.line}>51003 Tartu, Estonie</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  intro: {
    fontSize: 14,
    color: "#444",
    lineHeight: 22,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f5f5f7",
    borderRadius: 12,
    padding: 16,
    gap: 4,
  },
  orgName: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  line: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  url: {
    color: "#007AFF",
    marginTop: 8,
  },
});
