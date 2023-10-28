import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Step from "../../components/Step";
import ButtonGradient from "../../components/ButtonGradient";
import { useSelector } from "react-redux";
import Constants from "../../constants/styles";

export default function ThirdPhase({ navigation }) {
  const [values, setValues] = useState([]);
  const [fiveValArr, setfiveValArr] = useState(null);
  const [threeValArr, setthreeValArr] = useState([]);
  const [no, setNo] = useState([]);
  const [error, setError] = useState("");
  const { seedPhrase } = useSelector((state) => state.storage);

  const wordsArr = [
    "apple",
    "banana",
    "cherry",
    "dog",
    "elephant",
    "fox",
    "grape",
    "horse",
    "igloo",
    "jellyfish",
    "kiwi",
    "lemon",
  ];

  // FUNCTIONS
  function gen(params) {
    setValues([]);
    const threeRanVal = Math.floor(Math.random() * 400) + 121;
    let arr = threeRanVal.toString().split("");
    setNo(arr);
    setValues((val) => [
      ...val,
      seedPhrase[parseInt(threeRanVal.toString().charAt(0))],
      seedPhrase[parseInt(threeRanVal.toString().charAt(1))],
      seedPhrase[parseInt(threeRanVal.toString().charAt(2))],
    ]);
  }

  const inputChange = ({ val, index }) => {
    console.log(val, index);
    if (threeValArr.length == 3) {
      return;
    }
    setthreeValArr((item) => [...item, val]);
  };

  function verify() {
    if (
      seedPhrase.indexOf(threeValArr[0]) == no[0] &&
      seedPhrase.indexOf(threeValArr[1]) == no[1] &&
      seedPhrase.indexOf(threeValArr[2]) == no[2]
    ) {
      return navigation.navigate("success");
    }
    setError(
      "An Error Occured, Please Enter Correct Order of the phrase. Please Try Again."
    );
    setthreeValArr([]);
    setTimeout(() => {
      setError("");
    }, 9000);
  }

  const func = () => {
    verify();
  };

  const removeLastValueFromArray = () => {
    let newArr = [...threeValArr];
    newArr.pop();
    setthreeValArr(newArr);
  };

  useEffect(() => {
    gen();
  }, []);

  useEffect(() => {
    if (!values) return;
    let arr = [...values];
    const twoRanVal = Math.floor(Math.random() * 20) + 11;
    arr.splice(parseInt(twoRanVal.toString().charAt(0)), 0, "goat");
    arr.splice(parseInt(twoRanVal.toString().charAt(1)), 0, "fish");

    setfiveValArr(arr);
  }, [values]);

  return (
    <View style={Constants.container2Home}>
      <Step one={3} navigation={navigation} />
      <Text style={styles.confirm}>Confirm Seed Phrase</Text>
      <View style={styles.container2}>
        <Text style={styles.select}>
          Select each word in the order it was presented to you
        </Text>
        <View style={styles.options1}>
          {threeValArr.length > 0
            ? threeValArr.map((val, index) => (
                <TouchableOpacity
                  onPress={removeLastValueFromArray}
                  key={index}
                >
                  <Text style={styles.optiontext}>
                    <Text>{parseInt(no[parseInt(index)]) + 1}. </Text>
                    {val ? val : ""}
                  </Text>
                </TouchableOpacity>
              ))
            : no?.map((val, index) => (
                <Text
                  style={[styles.optiontext, { paddingRight: 40 }]}
                  key={index}
                >
                  <Text>{parseInt(val) + 1}. </Text>
                </Text>
              ))}
        </View>
      </View>
      <View style={styles.options2}>
        {fiveValArr?.map((val, index) => (
          <TouchableOpacity
            onPress={() => inputChange({ val, index })}
            key={index}
          >
            <Text style={styles.optiontext}>{val}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ color: "red", fontWeight: "700", fontSize: 17 }}>
        {error}
      </Text>

      <View style={{ marginTop: 30 }}>
        {threeValArr.length == 3 ? (
          <ButtonGradient
            setError={setError}
            text={"Next"}
            navigation={navigation}
            route={"func"}
            func={func}
            widthSp={200}
          />
        ) : (
          ""
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  options1: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  options2: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 50,
  },
  optiontext: {
    marginRight: 10,
    marginLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#1c1924",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
  },
  container2: {
    marginTop: 80,
    backgroundColor: "#131118",
    padding: 20,
    borderRadius: 10,
  },
  select: {
    color: "white",
    fontWeight: "400",
    fontSize: 14,
    marginBottom: 20,
  },
  confirm: {
    color: "white",
    textAlign: "center",
    marginTop: 30,
    fontWeight: "600",
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#09080c",
  },
});
