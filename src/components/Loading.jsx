import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail size={160} thickness={12} color={"#00adb5"}  />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
