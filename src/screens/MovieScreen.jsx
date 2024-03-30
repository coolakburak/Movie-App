import {
  Image,
  SafeAreaViewComponent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "react-native-svg";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../../api/moviedb";

const MovieScreen = ({ navigation }) => {
  const { params: item } = useRoute();

  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
    setLoading(false);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* back button and movie poster */}
      <View style={{ width: "100%" }}>
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
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: image500(movie?.poster_path) }}
              style={{
                width: "100%",
                height: 500,

                zIndex: -1,
                position: "absolute",
                top: -80,
              }}
            />
            <LinearGradient
              style={styles.LinearGradient}
              colors={["transparent", "#222831", 'rgba("23,23,23,0.8")']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            />
          </View>
        )}
      </View>

      {/* movie details */}
      <View stlye={styles.movieDetailsContainer}>
        <Text style={styles.movieDetailsText}>{movie?.title}</Text>
        {/* status, release, runtime  */}
        <Text style={styles.movieDetailsSecondary}>
          {movie?.status} * {movie?.release_date?.split("-")[0]} *{" "}
          {movie?.runtime} mins
        </Text>

        {/* genres */}
        <View style={styles.genresContainer}>
          {movie?.genres?.map((genre, index) => (
            <Text key={index} style={styles.movieDetailsSecondary}>
              {genre.name} *{" "}
            </Text>
          ))}
        </View>
        {/* description */}
        <Text style={styles.description}>
          {movie?.overview?.length > 800
            ? movie?.overview?.slice(0, 800) + "..."
            : movie?.overview}
        </Text>
      </View>
      {/* cast */}
      <Cast navigation={navigation} cast={cast} />

      {/* similar movies */}
      <MovieList
        title="Similar Movies"
        data={similarMovies}
        hideViewAll={true}
      />
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#222831",
    paddingTop: 40,
  },
  moviePoster: {
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  movieContainer: {
    borderRadius: 10,
    marginHorizontal: -12,
    backgroundColor: "#00adb5",
  },
  LinearGradient: {
    height: 300,
    width: "100%",
    position: "absolute",
    zIndex: 10,
    bottom: 0,
  },
  movieDetailsContainer: {
    marginTop: 30,
    marginHorizontal: 16,
  },
  movieDetailsText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    marginTop: 420,
  },
  movieDetailsSecondary: {
    textAlign: "center",
    color: "white",
    fontSize: 14,
    letterSpacing: 2,
    fontWeight: "300",
  },
  genresContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  description: {
    color: "white",
    fontSize: 12,
    fontWeight: "200",
    marginTop: 10,
  },
});
