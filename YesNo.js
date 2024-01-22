import {ActivityIndicator, Button, Image, StyleSheet, Text, View} from 'react-native';
import {useState} from "react";

export default function YesNo() {
	const [image, setImage] = useState("")
	const [response, setResponse] = useState("")
	const [loading, setLoading] = useState(false)

	function question() {
		setLoading(true)
		fetch("https://yesno.wtf/api", {method: "get"})
			.then(response => response.json())
			.then((response) => {
				setImage(response.image)
				setResponse(response.answer)
				setLoading(false)
			})
	}

	return (
		<View style={styles.container}>
			{loading ? <>
				<ActivityIndicator size={"large"}/>
			</> : <>
				<View>
					<Image
						source={{uri: image}}
						resizeMode={"contain"}
						style={{height:256, width:256}}
						resizeMethod={"auto"}/>
				</View>
				<View>
					<Text style={{fontSize:30}}>{response}</Text>
				</View>
			</>}

			<View>
				<Button title={"question"} onPress={question}/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
