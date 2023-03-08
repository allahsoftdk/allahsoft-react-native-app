import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Text, View } from "native-base";
import { useColorScheme, ActivityIndicator } from "react-native";
import axiosInstance from "../utils/axios";
import SearchBarComponent from "../components/SearchBarComponent";
import SearchList from "../components/SearchList";

const SearchScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [users, setUsers] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const colorScheme = useColorScheme();

    useEffect(() => {
        axiosInstance.get("/api/user/",).then((res) => {
            setUsers(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [refreshing, navigation]);


    return (
        <NativeBaseProvider>
            <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
                <Text padding={5} style={{ fontSize: 20, fontWeight: "bold", color: colorScheme === "dark" ? "white" : "black", textAlign: "center" }}>Find Users</Text>
                <SearchBarComponent searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} clicked={clicked} setClicked={setClicked} />
                {!users ? <ActivityIndicator size="large" color="#0000ff" /> : <SearchList users={users} searchPhrase={searchPhrase} setClicked={setClicked} navigation={navigation} refreshing={refreshing} setRefreshing={setRefreshing} />}
            </View>
        </NativeBaseProvider>
    )
};
export default SearchScreen;