import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { image185, image500 } from "../../api/moviedb";
const Cast = ({ cast }) => {
  const navigation = useNavigation();
  console.log("cast", cast);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {/* {cast &&
          

          cast.map((person, index) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("PersonScreen", person)}
              style={styles.castContainer}
              key={index}
            >
              <View style={styles.castPhoto}>
                <Image
                  source={{ uri: image185(person?.profile_path) }}
                  
                />
              </View>

              <Text style={styles.castText}>
                {personName.length > 10
                  ? personName.slice(0, 10) + "..."
                  : personName}
              </Text>
              <Text style={styles.castText}>
                {characterName.length > 10
                  ? characterName.slice(0, 10) + "..."
                  : characterName}
              </Text>
            </TouchableOpacity>
          ))} */}
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("PersonScreen", person)}
                style={styles.castContainer}
                key={index}
              >
                <View>
                  <Image
                    source={{ uri: image185(person?.profile_path) }}
                    width={100}
                    height={100}
                    borderRadius={60}
                    resizeMode="stretch"
                  />
                </View>
                <Text style={styles.castText}>
                  {person.name?.length > 15
                    ? person.name.slice(0, 15) + "..."
                    : person.name}
                </Text>
                <Text style={styles.castText}>
                  {person.character.length > 15
                    ? person.character.slice(0, 15) + "..."
                    : person.character}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginBottom: 10,
  },
  castContainer: {
    borderRadius: 10,
    marginRight: 16,
    width: 150,
    height: 150,
    alignItems: "center",
  },

  castText: {
    color: "white",
    textAlign: "center",
    fontSize: 12,
  },
});
