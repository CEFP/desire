import {Button, Text, TextInput, View} from "react-native";

export default function Bavardage() {
	return <View style={{
		minHeight:"100vh",
	}}>
		<Text>Bavardage</Text>

		<View style={{
			position:"absolute",
			bottom:0,
			display:"flex",
			flexDirection:"row"
		}}>
			<TextInput
				style={{
					height:40,
					backgroundColor:"silver",
					width:"75vw"
				}}
				placeholder={"tape ton message"}/>
			<Button title={"envoyer"}/>
		</View>
	</View>
}
