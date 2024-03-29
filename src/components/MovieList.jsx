import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { image185, image342 } from "../../api/moviedb";
const MovieList = ({ title, data, hideViewAll }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <Text style={styles.titleHeader}>{title}</Text>
        {!hideViewAll && (
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity> */}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            style={{ alignItems: "center", justifyContent: "center" }}
            key={index}
            onPress={() => navigation.navigate("MovieScreen", item)}
          >
            <View style={styles.imagesContainer}>
              <Image
                source={{ uri: image185(item.poster_path) }}
                style={styles.upcomingImages}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.upcomingText}>
              {item.original_title?.length > 16
                ? item.original_title?.slice(0, 16) + "..."
                : item.original_title}
            </Text>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginTop: 16,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    alignItems: "center",
  },
  titleHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  viewAll: {
    color: "#00adb5",
    fontSize: 16,
  },
  upcomingText: {
    color: "white",
    fontSize: 16,
    marginLeft: 4,
  },
  imagesContainer: {
    width: 200,
    height: 200,

    borderRadius: 10,
    // marginRight: 16,
    marginTop: 12,
  },
  upcomingImages: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
