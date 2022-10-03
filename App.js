import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./componenrs/GoalItem";
import GoalInput from "./componenrs/GoalInput";

export default function App() {
  const [st_ModleVisable, st_SetModleVisable] = useState(false);
  const [st_ListOfGoal, st_SetListOfGoal] = useState([]);

  const addGoalHandler = (newGoal) => {
    st_SetListOfGoal((currentStateListOfGoal) => [
      ...currentStateListOfGoal,
      { text: newGoal, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  };

  function startAddGoalHandler() {
    st_SetModleVisable(true);
  }
  function endAddGoalHandler() {
    st_SetModleVisable(false);
  }
  function daletGoalHandler(id) {
    console.log("id", id);
    const currentStateListOfGoal = st_ListOfGoal.filter((goal) => {
      return goal.id !== id;
    });
    st_SetListOfGoal(currentStateListOfGoal);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.mainApp}>
        <Button
          title="Add new goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        {st_ModleVisable && (
          <GoalInput
            onAddGoal={addGoalHandler}
            showModal={st_ModleVisable}
            onCansal={endAddGoalHandler}
          />
        )}
        <View style={styles.goalsContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={st_ListOfGoal}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDaletGoal={daletGoalHandler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainApp: {
    padding: 50,
    flex: 1,
  },
  goalsContainer: {
    flex: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
  },
});
