import { useState, useEffect } from "react";
import { Button, Text, Box, Center, Heading, HStack, Stack, Input, View, Spacer, VStack, Divider, FlatList, NativeBaseProvider } from "native-base";
import { Pressable, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import EditPostModal from "../components/EditPostModal";
import { globalStyles } from "../styles/globalStyles";
import axiosInstance from "../utils/axios";

const PostScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [thoughts, setThoughts] = useState<string>("");
    const [postComments, setPostComments] = useState<any>([]);
    const [loggedInUser, setLoggedInUser] = useState<any>();
    const [refreshing, setRefreshing] = React.useState(false);

    const postComment = () => {
        if (thoughts === "") { alert("Please enter some thoughts"); return; }
        axiosInstance.post(`/api/post_comment/${route.params.item.id}`, { comment: thoughts }).then((res) => {
            setThoughts("");
            setPostComments([...postComments, res.data]);
        }).catch((err) => {
            console.log(err);
        });
    };

    const deleteComment = (commentId: number) => {
        axiosInstance.delete(`/api/post_comment/${commentId}`).then((res) => {
            setPostComments(postComments.filter((comment: any) => comment.id !== commentId));
        }).catch((err) => {
            console.log(err);
        });
    };

    // useEffect(() => {
    //     console.log(postComments)
    // }, [postComments]);

    useEffect(() => {
        axiosInstance.get(`/api/post_comment/${route.params.item.id}`).then((res) => {
            setPostComments(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
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
        getLoggedInUser();
    }, []);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, []);

    const colorScheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
                <Center>
                    <Box alignItems="center" paddingTop={2} >
                        <Box width={350} borderWidth={1} borderColor={"#165d31"} borderRadius={8} background={"white"} >
                            <HStack p={2}>
                                <VStack ml={2}>
                                    <Text fontSize="md" bold>{route.params.item.user.name}</Text>
                                </VStack>
                                <Spacer />
                                <VStack mr={2}>
                                    <Text fontSize="sm" color="gray.500">{new Date(route.params.item.updatedAt).toLocaleString()}</Text>
                                    {route.params.item.isUpdated ? <Text fontSize="sm" color="gray.500" alignSelf="flex-end">Edited</Text> : null}
                                </VStack>
                            </HStack>
                            <VStack p={2}>
                                <Text fontSize="md">{route.params.item.description}</Text>
                            </VStack>
                            <HStack p={2} space={6} >
                            </HStack>
                        </Box>

                        <HStack p={2} borderBottomColor={globalStyles.greenColor.backgroundColor} borderBottomWidth={2} borderRadius={2}>
                            <Input placeholder="Share your thoughts..." width="75%" marginRight={4} onChangeText={(text) => setThoughts(text)} value={thoughts} color={colorScheme === 'dark' ? 'white' : 'black'} />
                            <Button style={globalStyles.greenColor} width="20%" onPress={postComment}>Post</Button>
                        </HStack>
                        {!postComments ? null :
                            <FlatList data={postComments} renderItem={({ item }: any) => (
                                <Center>
                                    <Box alignItems="center" paddingTop={2} >
                                        <Box margin={1} width={350} borderWidth={1} borderColor={"#165d31"} borderRadius={8} background={"white"} >

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
                                                <Text fontSize="md">{item.comment}</Text>
                                            </VStack>
                                            <HStack p={2} space={6} >
                                                <HStack space={2}>
                                                    {loggedInUser?.id === item.user.id ? <EditPostModal post={item} onRefresh={onRefresh} /> : null}
                                                </HStack>
                                                <HStack space={2} >
                                                    {loggedInUser?.id === item.user.id ?
                                                        <Pressable onPress={() => deleteComment(item.id)}>
                                                            <HStack space={2} >
                                                                <AntDesign name="delete" size={24} color="red" />
                                                            </HStack>
                                                        </Pressable>
                                                        : null}
                                                </HStack>
                                            </HStack>
                                        </Box>
                                    </Box>
                                </Center>
                            )} />
                        }
                    </Box>
                </Center>
            </View>
        </NativeBaseProvider>

    )
};
export default PostScreen;