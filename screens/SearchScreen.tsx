import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, FormControl, Button, HStack, Input, Link, VStack } from "native-base";
import { Pressable, TextInput, useColorScheme, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import axiosInstance from "../utils/axios";
import SearchBarComponent from "../components/SearchBarComponent";
import SearchList from "../components/SearchList";

const SearchScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [searchPhrase, setSearchPhrase] = useState("");
    const [clicked, setClicked] = useState(false);
    const [users, setUsers] = useState([]);
    const colorScheme = useColorScheme();

    useEffect(() => {
        axiosInstance.get("/api/user/",).then((res) => {
            setUsers(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return (
        <NativeBaseProvider>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: colorScheme === "dark" ? "white" : "black", padding: 5, textAlign: "center" }}>Find Users</Text>
            <SearchBarComponent searchPhrase={searchPhrase} setSearchPhrase={setSearchPhrase} clicked={clicked} setClicked={setClicked} />
            {!users ? <ActivityIndicator size="large" color="#0000ff" /> : <SearchList users={users} searchPhrase={searchPhrase} setClicked={setClicked} navigation={navigation} />}
        </NativeBaseProvider>

    )
};
export default SearchScreen;