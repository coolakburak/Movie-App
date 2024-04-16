import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { XMarkIcon } from "react-native-heroicons/outline";
import { fetchSearchMovies, image185, image342 } from "../../api/moviedb";
import { debounce } from "lodash";

const SearchScreen = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search a movie..."
          placeholderTextColor="lightgray"
          color="white"
        />
        <TouchableOpacity
          style={styles.searchBarContainer}
          onPress={() => navigation.navigate("Home")}
        >
          <XMarkIcon size={32} color="lightgray" />
        </TouchableOpacity>
      </View>
      {/* Results */}
      {results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          style={styles.scrollView}
        >
          <Text style={styles.resultsText}>
            Results will be shown here... ({results.length})
          </Text>
          <View style={styles.resultsContainer}>
            {results.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("MovieScreen", item)}
                key={index}
              >
                <Image
                  style={styles.resultImage}
                  source={{uri: image185(item.poster_path)}}
                />
                <Text style={styles.movieName}>{item.title.length>22 ? item.title.slice(0, 22) + "..." : item.title
                }
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.noResultContainer}>
          <Image
            style={styles.noResultImage}
            source={require("../../assets/images/family.jpg")}
          />
          <Text style={styles.noResultsText}>No results found...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
  },
  searchBar: {
    backgroundColor: "#393e46",
    marginHorizontal: 16,
    marginTop: 40,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  scrollView: {
    marginTop: 20,
  },
  resultsText: {
    color: "lightgray",
    fontSize: 18,
    fontWeight: "400",
  },
  resultsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  resultImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
  movieName: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  noResultContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  noResultImage: {
    width: "90%",
    height: 400,
    borderRadius: 100,
  },
  noResultsText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});
