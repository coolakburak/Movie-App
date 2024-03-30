import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../../api/moviedb";

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();
  const handlePress = (item) => {
    navigation.navigate("MovieScreen", item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>TrendingMovies</Text>
      <Carousel
        autoPlay={true}
        scrollAnimationDuration={7000}
        loop
        data={data}
        onPress={() => console.log("pressed")}
        renderItem={({ item }) => (
          <MovieCard item={item} handlePress={handlePress} />
        )}
        width={330}
        height={400}
        style={styles.carouselContainer}
      />
    </View>
  );
};
const MovieCard = ({ item, handlePress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handlePress(item)}>
      <Image
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: 330,
          height: 400,
          resizeMode: "stretch",
        }}
      />
    </TouchableWithoutFeedback>
  );
};
export default TrendingMovies;

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    right: 22,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 32,
    marginBottom: 20,
  },
  carouselContainer: {
    borderRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 36,
    backgroundColor: "red",

    // backgroundColor: "yellow",
  },
});
