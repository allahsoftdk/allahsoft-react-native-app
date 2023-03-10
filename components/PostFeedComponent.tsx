import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import { Box, FlatList, Heading, HStack, VStack, Text, Spacer, View, Input, Button, Center, NativeBaseProvider, Pressable } from "native-base";
import { Post, User } from "../types";
import { ActivityIndicator, RefreshControl, TouchableOpacity, StyleSheet, useColorScheme, Alert } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import { Keyboard } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditPostModal from "./EditPostModal";
import { AntDesign } from "@expo/vector-icons";
import { color } from "native-base/lib/typescript/theme/styled-system";

const PostFeedComponent = ({ navigation, route }: { navigation: any, route: any }) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [thoughts, setThoughts] = useState<string>("");
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(1);
    const [isFocused, setIsFocused] = useState(false);


    const getLoggedInUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                setLoggedInUser(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(() => {
    //     console.log(posts)
    // }, [posts]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, []);

    useEffect(() => {
        axiosInstance.get("/api/post/following").then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].likedBy.forEach((user: any) => {
                    if (user.id === loggedInUser?.id) {
                        res.data[i].likedByLoggedInUser = true;
                    }
                });
            }
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
        getLoggedInUser();
    }, [refreshing]);

    const createPost = async () => {
        if (thoughts === "") { alert("Please enter some thoughts"); return; }

        axiosInstance.post("/api/post", { description: thoughts }).then((res) => {
            Keyboard.dismiss();
            setThoughts("");
            onRefresh();
        }
        ).catch((err) => {
            console.log(err);
        });
    };

    const likePost = (postId: Number) => {
        axiosInstance.post(`/api/post/like/${postId}`).then((res) => {
            setPosts(posts.map((post: any) => {
                if (post.id === postId) {
                    if (post.likedByLoggedInUser) {
                        post.likes = post.likes - 1;
                        post.likedByLoggedInUser = false;
                    } else {
                        post.likes = post.likes + 1;
                        post.likedByLoggedInUser = true;
                    }
                }
                return post;
            }));
        }).catch((err) => {
            console.log(err);
        });
    };

    const unLikePost = (postId: Number) => {
        axiosInstance.put(`/api/post/unlike/${postId}`).then((res) => {
            setPosts(posts.map((post: any) => {
                if (post.id === postId) {
                    if (post.likedByLoggedInUser) {
                        post.likes = post.likes - 1;
                        post.likedByLoggedInUser = false;
                    } else {
                        post.likes = post.likes + 1;
                        post.likedByLoggedInUser = true;
                    }
                }
                return post;
            }));
        }).catch((err) => {
            console.log(err);
        });
    };

    // use this when optimizing the feed. https://stackoverflow.com/questions/73440409/render-only-10-item-in-react-native-flatlist-on-each-page-then-the-next-5-on-pu
    const renderFooter = () => {
        return (
            //Footer View with Load More button
            <View style={loadMoreStyles.footer}>
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={onRefresh}
                    //On Click of button load more data
                    style={loadMoreStyles.loadMoreBtn}>
                    <Text style={loadMoreStyles.btnText}>Load More</Text>
                    {loading ? (
                        <ActivityIndicator
                            color="white"
                            style={{ marginLeft: 8 }} />
                    ) : null}
                </TouchableOpacity>
            </View>
        );
    };

    const colorScheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
                <Center>
                    <Box alignItems="center" paddingTop={2} >
                        <Heading size="md" p={2} alignSelf="center" borderBottomColor={globalStyles.greenColor.backgroundColor} borderBottomWidth={2} borderRadius={2} style={{
                            color: colorScheme === 'dark' ? 'white' : 'black',
                        }}>Your feed</Heading>
                        <HStack p={2} borderBottomColor={globalStyles.greenColor.backgroundColor} borderBottomWidth={2} borderRadius={2}>
                            <Input placeholder="Share your thoughts..." width="75%" marginRight={4} onChangeText={(text) => setThoughts(text)} value={thoughts} color={colorScheme === 'dark' ? 'white' : 'black'} />
                            <Button style={globalStyles.greenColor} width="20%" onPress={createPost}>Post</Button>
                        </HStack>
                        <FlatList data={posts} renderItem={({ item }) => (
                            <View p={2}>
                                <Box width={350} borderWidth={1} borderColor={"#165d31"} borderRadius={8} background={"white"} >
                                    <HStack p={2}>
                                        <VStack ml={2}>
                                            <Text fontSize="md" bold>{item.user.name}</Text>
                                        </VStack>
                                        <Spacer />
                                        <VStack mr={2}>
                                            <Text fontSize="sm" color="gray.500">{new Date(item.updatedAt).toLocaleString()}</Text>
                                            {item.isUpdated ? <Text fontSize="sm" color="gray.500" alignSelf="flex-end">Edited</Text> : null}
                                        </VStack>
                                    </HStack>
                                    <VStack p={2}>
                                        <Text fontSize="md">{item.description}</Text>
                                    </VStack>
                                    <HStack p={2} space={6} >
                                        <HStack space={2}>
                                            {loggedInUser?.id === item.user.id ? <EditPostModal post={item} onRefresh={onRefresh} /> : null}
                                        </HStack>
                                        <Pressable onPress={() => navigation.navigate('PostTab', { item: item })}>
                                            <HStack space={2} >
                                                <Text fontSize="md" bold>Comments</Text>
                                                <Text fontSize="md" bold>{item.postComments.length}</Text>
                                            </HStack>
                                        </Pressable>
                                        <Pressable onPress={() => item.likedByLoggedInUser ? unLikePost(item.id) : likePost(item.id)}>
                                            <HStack space={2} >
                                                <AntDesign name={item.likedByLoggedInUser ? "heart" : "hearto"} size={24} color="red" />
                                                <Text fontSize="md" bold>{item.likes}</Text>
                                            </HStack>
                                        </Pressable>
                                    </HStack>
                                </Box>
                            </View>
                        )}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />
                    </Box>
                </Center>
            </View>
        </NativeBaseProvider>

    );

};

const loadMoreStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#800000',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
});


const scrollStyle = {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    paddingBottom: 150,
};

export default PostFeedComponent;