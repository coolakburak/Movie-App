import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const PersonScreen = () => {
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
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
              source={require("../../assets/images/splashimage.jpg")}
              style={styles.personImage}
            />
          </View>
          {/* NAME AND HOMETOWN */}
          <View style={styles.personInfoContainer}>
            <Text style={styles.personName}>Tom Hanks</Text>
            <Text style={styles.personHome}>California, USA</Text>
          </View>
          {/* PERSONAL INFOS */}
          <View style={styles.description}>
            <View style={styles.descriptionDown}>
              <Text style={styles.descriptionText}>Gender</Text>
              <Text style={styles.descriptionText}>Male</Text>
            </View>
            <View style={styles.descriptionDown}>
              <Text style={styles.descriptionText}>Birthday</Text>
              <Text style={styles.descriptionText}>04 14 1957</Text>
            </View>
            <View style={styles.descriptionDown}>
              <Text style={styles.descriptionText}>Known For</Text>
              <Text style={styles.descriptionText}>Acting</Text>
            </View>
            <View style={styles.lastLineDescription}>
              <Text style={styles.lastLine}>Popularity</Text>
              <Text style={styles.lastLine}>64.23</Text>
            </View>
          </View>
          <View>
            <Text>Biography</Text>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              in totam, amet dolor dolorum aperiam, voluptatem assumenda sunt
              officiis earum natus odit fugiat. Minima earum necessitatibus,
              adipisci autem tempora modi quidem officia perferendis, dolorum,
              esse sequi accusantium incidunt? Quod ab atque non perferendis
              earum accusamus harum culpa quas provident quos debitis ex, itaque
              aliquid sunt sit quo sed saepe dolorem eligendi sapiente
              praesentium ipsa tempore? Pariatur eum iure ipsam tempore placeat.
              Voluptas unde eius, magni assumenda tenetur commodi quo ipsum
              incidunt velit illo nobis. Quisquam, quidem. Quisquam, quidem.
              Quisquam, quidem. Quisquam,Lorem, ipsum dolor sit amet consectetur
              adipisicing elit. Numquam minima iure sint architecto quo
              praesentium eius velit vero, id, temporibus consequatur. Quibusdam
              commodi quas sit temporibus, voluptates cumque fugit placeat, eius
              provident itaque, voluptatem cupiditate voluptatibus ipsum
              recusandae et iure corrupti eligendi. Dolor, ipsam enim voluptatum
              consectetur eos veritatis impedit ad iusto doloremque aperiam
              delectus aliquid iure. Iusto laboriosam reiciendis unde quos ea
              voluptas fuga perspiciatis velit provident voluptate ullam qui
              obcaecati eius libero corporis delectus dolore consequatur officia
              minima itaque voluptatem quia, maxime facilis ex. Explicabo,
              temporibus veniam, praesentium aperiam inventore, earum
              consequuntur dolorum ad dolorem quam nostrum maiores.
            </Text>
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
    width: 250,
    height: 250,
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
    paddingLeft: 12,
    borderRadius: 100,
  },
  descriptionDown: {
    borderRightWidth: 2,
    borderRightColor: "white",
    paddingVertical: 10,
    padding: 20,
    alignItems: "center",
  },
  descriptionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "200",
  },
  lastLineDescription: {
    paddingVertical: 10,
    padding: 16,
    alignItems: "center",
  },
  lastLine: {
    color: "white",
    fontSize: 14,
    fontWeight: "200",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 10,
  },
});
