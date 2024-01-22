import {ActivityIndicator, Button, Image, StyleSheet, Text, View} from 'react-native';
import {Link, NativeRouter, Route, Routes} from "react-router-native";
import YesNo from "./YesNo";
import ChatGroup from "./ChatGroup";
import Bavardage from "./Bavardage";

export default function App() {
	return (
		<NativeRouter>
			<Routes>
				<Route path={"/"} element={<>
					<View style={{padding:128,alignSelf:"center", alignContent:"center"}}>
						<Link to={"/yesno"}><Text>Yes No</Text></Link>
						<Link to={"/chat"}><Text>chat</Text></Link>
					</View>
				</>}/>
				<Route path={"/yesno"} element={<YesNo/>}/>
				<Route path={"/chat"} element={<ChatGroup/>}/>
				<Route path={"/bavardage"} element={<Bavardage/>}/>
			</Routes>
		</NativeRouter>
	);
}
