import React, { useEffect, useState } from "react";

import socket from "../utils/socket";
import axiosInstance from "../utils/axios";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, View, ScrollView, Input, Button, Modal } from "native-base";
import { Post, User } from "../types";
import { RefreshControl } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Keyboard } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditPostModal from "./EditPostModal";

const PostFeedComponent = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [thoughts, setThoughts] = useState<string>("");
    const [loggedInUser, setLoggedInUser] = useState<User>();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        axiosInstance.get("/api/post/following").then((res) => {
            res.data.sort((a: Post, b: Post) => {
                return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            });
            res.data.forEach((post: Post) => {
                if (post.updatedAt.toString() !== post.createdAt.toString()) {
                    post.isUpdated = true;
                }
                else {
                    post.isUpdated = false;
                }
            });
            setPosts(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [refreshing]);

    useEffect(() => {
        axiosInstance.get("/api/auth/loggedInUser").then((res) => {
            setLoggedInUser(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const createPost = async () => {
        axiosInstance.post("/api/post", { description: thoughts }).then((res) => {
            Keyboard.dismiss();
            setThoughts("");
            onRefresh();
        }
        ).catch((err) => {
            console.log(err);
        });
    };

    return (
        <Box>
            <Heading size="md" p={2} alignSelf="center" borderBottomColor={globalStyles.greenColor.backgroundColor} borderBottomWidth={2} borderRadius={2}>Your feed</Heading>
            <HStack p={2} borderBottomColor={globalStyles.greenColor.backgroundColor} borderBottomWidth={2} borderRadius={2}>
                <Input placeholder="Share your thoughts..." width="75%" marginRight={4} onChangeText={(text) => setThoughts(text)} value={thoughts} />
                <Button style={globalStyles.greenColor} width="20%" onPress={createPost}>Post</Button>
            </HStack>
            <FlatList contentContainerStyle={scrollStyle} data={posts} renderItem={({ item }) => (
                <Box borderBottomColor={globalStyles.greenColor.backgroundColor} borderBottomWidth={4} borderRadius={10} my={2} mx={2} borderLeftColor={globalStyles.greenColor.backgroundColor} borderLeftWidth={2} borderRightColor={globalStyles.greenColor.backgroundColor} borderRightWidth={2} borderTopColor={globalStyles.greenColor.backgroundColor} borderTopWidth={2}>
                    <HStack p={2}>
                        <VStack ml={2}>
                            <Text fontSize="md" bold>{item.user.name}</Text>
                            <Text fontSize="sm" color="gray.500">{item.user.email}</Text>
                        </VStack>
                        <Spacer />
                        <VStack mr={2}>
                            <Text fontSize="sm" color="gray.500">{new Date(item.updatedAt).toLocaleString()}</Text>
                            {item.isUpdated ? <Text fontSize="sm" color="gray.500" alignSelf="flex-end">Edited</Text> : null}
                            {loggedInUser?.id === item.user.id ? <EditPostModal post={item} onRefresh={onRefresh} /> : null}
                        </VStack>
                    </HStack>
                    <VStack p={2}>
                        <Text fontSize="md">{item.description}</Text>
                    </VStack>
                    <HStack p={2}>
                        <Text fontSize="md" bold>Comments</Text>
                        <Text fontSize="sm" color="gray.500">Likes</Text>
                    </HStack>
                </Box>
            )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </Box>
    );

};

const scrollStyle = {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 150,
};

export default PostFeedComponent;