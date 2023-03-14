import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, Button, HStack, Spacer, VStack, View, Pressable } from "native-base";
import { ActivityIndicator, FlatList, RefreshControl, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../utils/axios";
import { User } from "../types";
import EditPostModal from "../components/EditPostModal";
import { AntDesign } from "@expo/vector-icons";

const UserProfileScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [user, setUser] = useState<User>(route.params.user);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [followers, setFollowers] = useState<any>([]);
    const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);
    const [posts, setPosts] = useState<any>([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [thoughts, setThoughts] = useState<string>("");
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [errorMessage, setErrorMessage] = useState<string>("");
    // const [loadDone, setLoadDone] = useState<boolean>(false);
    const [loadPostsDone, setLoadPostsDone] = useState<boolean>(false);
    const [loadFollowersDone, setLoadFollowersDone] = useState<boolean>(false);
    const [loadIsFollowingDone, setLoadIsFollowingDone] = useState<boolean>(false);

    useEffect(() => {
        const getLoggedInUser = async () => {
            const user = await AsyncStorage.getItem("user");
            if (user) {
                setLoggedInUser(JSON.parse(user));
            }
        };
        getLoggedInUser();
    }, []);

    useEffect(() => {
        if (loggedInUser?.id === user.id) {
            setIsOwnProfile(true);
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (!loggedInUser) { return; }
        axiosInstance.get(`/api/user/followers/${loggedInUser?.id}`).then((res) => {
            setLoadIsFollowingDone(true);
            res.data.forEach((following: any) => {
                if (following.following[0].id == user.id) {
                    setIsFollowing(true);
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }, [loggedInUser]);

    const createChat = async () => {
        axiosInstance.post(`/api/chatRoom/${user.id}`).then((res) => {
            navigation.navigate("MessageTab", {
                id: res.data.id,
                name: res.data.chatRoomParticipants.filter((participant: any) => participant.id === user.id)[0].name,
                loggedInUser: loggedInUser
            });
        }).catch((err) => {
            setErrorMessage(err.response.data.message);
            console.log(err);
        });
    };

    const followUser = async () => {
        axiosInstance.post(`/api/user/follow/${user.id}`).then((res) => {
            setIsFollowing(true);
            setFollowers(followers + 1);
        }).catch((err) => {
            setErrorMessage(err.response.data.message);
            console.log(err);
        });
    };

    const unfollowUser = async () => {
        axiosInstance.put(`/api/user/unfollow/${user.id}`).then((res) => {
            setIsFollowing(false);
            setFollowers(followers - 1);
        }).catch((err) => {
            setErrorMessage(err.response.data.message);
            console.log(err);
        });
    };

    React.useEffect(() => {
        axiosInstance.get(`/api/user/followedBy/${user.id}`).then((res) => {
            setFollowers(res.data[0].followedBy.length);
            setLoadFollowersDone(true);
        }).catch((err) => {
            setErrorMessage(err.response.data.message);
            console.log(err);
        });
    }, []);

    React.useEffect(() => {
        axiosInstance.get(`/api/post/user/${user.id}`).then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].likedBy.forEach((user: any) => {
                    if (user.id === loggedInUser?.id) {
                        res.data[i].likedByLoggedInUser = true;
                    }
                });
            }
            setPosts(res.data);
            setLoadPostsDone(true);
        }).catch((err) => {
            setErrorMessage(err.response.data.message);
            console.log(err);
        });
    }, [loggedInUser]);


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, []);

    const likePost = (postId: number) => {
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
            setErrorMessage(err.response.data.message);
            console.log(err);
        });
    };

    const unLikePost = (postId: number) => {
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
            setErrorMessage(err.response.data.message);
            console.log(err);
        });
    };


    const colorScheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
                {!loadFollowersDone || !loadIsFollowingDone || !loadPostsDone || !posts ? <Center flex={1}><ActivityIndicator size="large" color="#165d31" /></Center> :
                    <Center>
                        <Box alignItems="center" paddingTop={10} >
                            <HStack>
                                {!!errorMessage && <Text>{errorMessage}</Text>}
                                <Heading style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} size="xl" ml="-1">{user.name}</Heading>
                            </HStack>

                            {isOwnProfile ? <Text></Text> :
                                <HStack p={4} space={2}>
                                    <Button onPress={createChat} bg="#165d31">Message</Button>
                                    {isFollowing ? <Button onPress={unfollowUser} bg="#165d31">Unfollow</Button> : <Button onPress={followUser} bg="#165d31">Follow</Button>}
                                </HStack>
                            }
                            <HStack paddingBottom={4}>
                                <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} >{followers} followers</Text>
                            </HStack>
                            <HStack>
                                {posts.length == 0 ? <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} >No posts yet</Text> : <Text></Text>}
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
                }
            </View>
        </NativeBaseProvider>

    )
};
export default UserProfileScreen;