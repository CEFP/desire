import {Button, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import {useNavigate} from "react-router-native";

export default function ChatGroup() {
	const navigate = useNavigate()
	const [pseudo, setPseudo] = useState("")
	return <View style={{padding: "20%"}}>
		<Text>Entrez votre Pseudo</Text>
		<TextInput
			onChange={(e) => setPseudo(e.target.value)}
			style={{
				borderStyle: "solid", backgroundColor: "silver",
				borderBlockColor: "black", height: 40, marginVertical: 5
			}}/>
		<Button
			onPress={() => {
				if (pseudo.length) {
					console.log("got to chat")
					navigate("/bavardage")
				} else {
					console.log("cannot go to chat")
				}
			}}
			title={"Entrer"}/>
	</View>
}
