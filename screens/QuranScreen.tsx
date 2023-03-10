import React, { useCallback, useState } from "react";
import { Text, Box, Center, Heading, HStack, Stack, Flex, View } from "native-base";
import { FlatList, Pressable, useColorScheme } from "react-native";
import axios from "axios";
import { QuranChapters } from "../types";

const QuranScreen = ({ navigation }: { navigation: any }) => {
    const [quranChapters, setQuranChapters] = useState<QuranChapters>({} as QuranChapters);


    React.useEffect(() => {
        axios.get("https://api.quran.com/api/v4/chapters?language=en").then((res) => {
            setQuranChapters(res.data);
            // setQuran(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);



    const renderItem = useCallback(({ item }: { item: any }) => {
        return (
            <View flex={1}>
                <Pressable onPress={() => navigation.navigate('QuranChapterTab', { chapterId: item.id })}>
                    <Stack p="2">
                        <Center>
                            <Box width={"350"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" bg={"white"} >
                                <Flex direction="row" p="2">
                                    <HStack p={2} paddingRight={"4"} >
                                        <Heading color={"#165d31"} > {item.id}</Heading>
                                    </HStack>
                                    <View>
                                        <Flex direction="column" >
                                            <Heading color={"#165d31"} >  {item.name_simple}</Heading>
                                            <Flex direction="row" >
                                                <Text> {item.name_simple} </Text>
                                                <View>
                                                    <Text> {item.verses_count}  Ayahs </Text>
                                                </View>
                                            </Flex>
                                        </Flex>
                                    </View>
                                </Flex>
                            </Box>
                        </Center>
                    </Stack>
                </Pressable>
            </View>
        )
    }, []);


    // React.useEffect(() => {
    //     console.log(quranChapters);
    // }, [quranChapters]);

    const colorScheme = useColorScheme();
    return (
        <View flex={1} backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} >
            <Box alignSelf={"center"} paddingBottom={50} >
                <Heading style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} fontSize="xl" p="4" pb="3">Surah</Heading>
                <FlatList
                    style={{ paddingBottom: 400 }}
                    data={quranChapters.chapters}
                    renderItem={renderItem}
                    getItemLayout={(data, index) => (({ length: 100, offset: 100 * index, index }))}
                    keyExtractor={(item, index) => index.toString()}
                    windowSize={1}
                    onEndReachedThreshold={0.5}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                />
            </Box>
        </View>
    )
};
export default QuranScreen;