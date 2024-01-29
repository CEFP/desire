import {Button, Dimensions, ScrollView, Text, TextInput, View} from "react-native";
import {useEffect, useState} from "react";
import init from "react_native_mqtt"
import AsyncStorage from "@react-native-async-storage/async-storage";

init({
	size: 10000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
	sync: {}
});
const options = {
	host: 'broker.emqx.io',
	port: 8083,
	path: '/testTopic',
	id: 'id_' + parseInt(Math.random() * 100000)
};
const client = new Paho.MQTT.Client(options.host, options.port, options.path);
const listMessages = []
export default function Bavardage() {
	const [monMessage, setMonMessage] = useState("")
	const [newMessage, setNewMessage] = useState("")
	// const [listMessages, setListMessages] = useState([])


	const onConnect = (c) => {
		console.log(c)
		client.subscribe("/godomey", {qos: 0, onSuccess: console.log, onFailure: console.error});
		client.onMessageArrived = function (msg) {
			console.log(msg.payloadString)
			// setListMessages([...listMessages, JSON.parse(msg.payloadString)])
			setNewMessage(JSON.parse(msg.payloadString))
			listMessages.push(JSON.parse(msg.payloadString))
		}
	}
	const onFailure = (c) => {
		console.log(c)
	}
	useEffect(() => {
		client.connect({
			onSuccess: onConnect,
			useSSL: false,
			timeout: 3,
			onFailure: onFailure
		});
	}, [])

	return <View style={{
		minHeight:"100vh",
		maxWidth: Dimensions.get("window").width
	}}>
		<View style={{
			position:"fixed",
			top:0,
			height:20,
			zIndex:9,
			backgroundColor:"white"
		}}>
			<Text>Bavardage</Text>
		</View>
		<ScrollView style={{padding:5,top:20}}>
			{listMessages.map((msg)=><>
				<View key={msg} style={{
					backgroundColor: "silver",
					margin:5,
					padding:10,
					width:"100%"
				}}>
					<Text>Message de: {msg.sender}</Text>
					<View style={{marginVertical:5}}>{msg.message}</View>
					<Text>Le: {msg.moment}</Text>
				</View>
			</>)}
		</ScrollView>
		<View style={{
			position:"fixed",
			bottom:0,
			display:"flex",
			flexDirection:"row"
		}}>
			<TextInput
				value={monMessage}
				style={{
					height:40,
					backgroundColor:"silver",flexGrow:1,
					width: Dimensions.get("window").width - 84
				}}
				onChange={(e)=>setMonMessage(e.target.value)}
				placeholder={"tape ton message"}/>
			<Button
				onPress={()=>{
					if (monMessage.length) {
						// listMessages.push({
						// 	sender:"Moi",
						// 	message:monMessage,
						// 	moment:new Date()
						// })
						// setMonMessage("")

						const m = {
								sender:"Moi",
								message:monMessage,
								moment:new Date()}

						var message = new Paho.MQTT.Message(JSON.stringify(m));
						message.destinationName = "/godomey";
						client.send(message);
						setMonMessage("")
					}
				}}
				title={"envoyer"}/>
		</View>
	</View>
}
