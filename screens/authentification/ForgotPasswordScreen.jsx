import React, {useState} from "react";
import {View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {authentificationStyles} from "../../assets/styles/commonStyles";
import ReturnButton from "../../components/Input/ReturnButton";

/**
 * Password retrieval in the authorization stack
 * tbu. with implementation of POST call
 */
const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState("");

  const handleClick = () => {
    if (email) {
      navigation.navigate({
        name: "Log-In",
        params: {msg: "Neues Passwort wurde an deine Email versendet."}
      });
        Alert.alert("Hinweis", "Diese Funktion steht zur Zeit nicht zu Verfügung");
    } else {
      Alert.alert("Fehler", "Bitte überprüfe deine Eingaben!");
    }
  }

  return (
    <View style={authentificationStyles.container}>
      <Text style={authentificationStyles.header}>Passwort vergessen</Text>
      <TextInput
        style={authentificationStyles.inputRegular}
        placeholder={"Email"}
        value={email}
        onChangeText={(input) => setEmail(input)}
        keyboardType={"email-address"}
        autoCapitalize={"none"}
      />
      <TouchableOpacity
        style={authentificationStyles.button}
        onPress={handleClick}
      >
        <Text style={authentificationStyles.buttonText}>Passwort wiederherstellen</Text>
      </TouchableOpacity>
      <ReturnButton navigation={navigation}/>
    </View>
  )
}

export default ForgotPasswordScreen;