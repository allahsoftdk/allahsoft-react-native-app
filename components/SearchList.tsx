import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    SafeAreaView,
    ListRenderItemInfo,
    Button,
    RefreshControl,
} from "react-native";
import { User } from "../types";

// the filter
const SearchList = ({ searchPhrase, users, setClicked, navigation, setRefreshing, refreshing }: any) => {

    // definition of the Item, which will be rendered in the FlatList
    const UserItem = ({ user }: { user: User }) => (
        <View style={styles.item}>
            <Button title={user.name} onPress={() => {
                navigation.navigate("UserProfileTab", { user: user });
                setClicked(false);
            }} />
        </View>
    );

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    const renderItem = (item: ListRenderItemInfo<User>) => {
        // when no input, show all
        if (searchPhrase === "") {
            return <UserItem user={item.item} />;
        }
        // filter of the name
        if (item.item.name.toUpperCase().includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <UserItem user={item.item} />;
        }
    };

    return (
        <SafeAreaView style={styles.list__container}>
            <FlatList
                data={users}
                // @ts-ignore
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />

        </SafeAreaView>
    );
};

export default SearchList;

const styles = StyleSheet.create({
    list__container: {
        height: "85%",
        width: "100%",
    },
    item: {
        margin: 10,
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
});