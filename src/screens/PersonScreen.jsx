import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image500,
} from "../../api/moviedb";

const PersonScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [person, setPerson] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonMovies(item.id);
    getPersonDetails(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={styles.moviePoster}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.movieContainer}
        >
          <ChevronLeftIcon size={32} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <HeartIcon
            size={36}
            strokeWidth={2.5}
            color={isFavourite ? "#00adb5" : "red"}
          />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.personDetailsContainer}>
            <Image
              source={{ uri: image500(person?.profile_path) }}
              style={styles.personImage}
              resizeMode="cover"
              width={250}
              height={250}
            />
          </View>
          {/* NAME AND HOMETOWN */}
          <View style={styles.personInfoContainer}>
            <Text style={styles.personName}>{person.name}</Text>
            <Text style={styles.personHome}>{person.place_of_birth}</Text>
          </View>
          {/* PERSONAL INFOS */}
          <View style={styles.description}>
            <View style={styles.descriptionDown}>
              <Text style={styles.descriptionText}>Gender</Text>
              <Text style={styles.descriptionText}>
                {person.gender == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View style={styles.descriptionDown}>
              <Text style={styles.descriptionText}>Birthday</Text>
              <Text style={styles.descriptionText}>{person.birthday}</Text>
            </View>
            <View style={styles.descriptionDown}>
              <Text style={styles.descriptionText}>Known For</Text>
              <Text style={styles.descriptionText}>
                {person.known_for_department}
              </Text>
            </View>
            <View style={styles.lastLineDescription}>
              <Text style={styles.lastLine}>Popularity</Text>
              <Text style={styles.lastLine}>{person.popularity}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.biographyHeader}>Biography</Text>
            <Text style={styles.biography}>{person.biography}</Text>
          </View>
          {/* movies */}
          <MovieList title={"Movies"} hideViewAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222831",
  },
  moviePoster: {
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  movieContainer: {
    borderRadius: 10,
    marginHorizontal: -12,
    backgroundColor: "#00adb5",
  },
  personDetailsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  personImage: {
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  personInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  personName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  personHome: {
    color: "white",
    fontSize: 16,
    fontWeight: "300",
  },
  description: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#393e46",
    marginHorizontal: 2,
    marginTop: 20,
    paddingLeft: 20,
    borderRadius: 100,
  },
  descriptionDown: {
    borderRightWidth: 2,
    borderRightColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  descriptionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "200",
  },
  lastLineDescription: {
    paddingVertical: 10,
    paddingRight: 22,
    alignItems: "center",
  },
  lastLine: {
    color: "white",
    fontSize: 14,
    fontWeight: "200",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 14,
    marginLeft: 10,
  },
  biographyHeader: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
  biography: {
    color: "white",
    fontSize: 14,
    fontWeight: "200",
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
