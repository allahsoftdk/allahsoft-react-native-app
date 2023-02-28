import React, { useEffect, useState } from "react";

import socket from "../utils/socket";
import axiosInstance from "../utils/axios";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, View } from "native-base";
import { Post } from "../types";
import { RefreshControl } from "react-native";
import { globalStyles } from "../styles/globalStyles";

const PostFeedComponent = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        axiosInstance.get("/api/post/following").then((res) => {
            setPosts(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [refreshing]);

    return (
        <Box>
            <Heading size="md" p={2} alignSelf="center" borderBottomColor={globalStyles.greenColor.backgroundColor} borderBottomWidth={2} borderRadius={2}>Posts from users you follow</Heading>
            <FlatList data={posts} renderItem={({ item }) => (
                <Box borderBottomColor={globalStyles.greenColor.backgroundColor} borderBottomWidth={4} borderRadius={10} my={2} mx={2} borderLeftColor={globalStyles.greenColor.backgroundColor} borderLeftWidth={2} borderRightColor={globalStyles.greenColor.backgroundColor} borderRightWidth={2} borderTopColor={globalStyles.greenColor.backgroundColor} borderTopWidth={2}>
                    {/* create a twitter like post */}
                    <HStack space={2} p={2} alignItems="center">
                        <VStack space={1} alignItems="flex-start">
                            <Heading size="sm">{item.user.name}</Heading>
                        </VStack>
                        <Spacer />
                        <Text color="muted.400" fontSize="xs">
                            {item.updatedAt.toString().substring(0, 10) + " " + item.updatedAt.toString().substring(11, 16)}
                        </Text>
                    </HStack>
                    <Text p={2}>{item.description}</Text>
                </Box>
            )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </Box>
    );

};


export default PostFeedComponent;