import React, { useCallback, useState } from "react";
import { Box, Center, Heading, HStack, Stack, Flex, Text, View } from "native-base";
import { FlatList, useColorScheme } from "react-native";
import axios from "axios";
import { QuranVerse } from "../types";

const QuranChapterScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [quranVerse, setQuranVerse] = useState<QuranVerse>({} as QuranVerse);
    const [chapterId, setChapterId] = useState<number>(route.params.chapterId ? route.params.chapterId : 1);
    const colorScheme = useColorScheme();

    React.useEffect(() => {
        axios.get("https://api.alquran.cloud/v1/surah/" + chapterId + "/en.asad").then((res) => {
            setQuranVerse(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);



    const renderItem = useCallback(({ item }: { item: any }) => {
        return (
            <View flex={1}>
                <Stack p="2">
                    <Center>
                        <Box width={"90%"} rounded="lg" borderColor="#165d31" borderWidth="1" bg={"white"} >
                            <Flex direction="row" p="2">
                                <HStack p={2} paddingRight={"4"} >
                                    <Heading color={"#165d31"} > {item.number}</Heading>
                                </HStack>
                                <HStack alignItems={"center"}>
                                    <Text w={'85%'} color={"#165d31"} >  {item.text}</Text>
                                </HStack>
                            </Flex>
                        </Box>
                    </Center>
                </Stack>
            </View>
        )
    }, []);


    // React.useEffect(() => {
    //     console.log(quranChapters);
    // }, [quranChapters]);

    return quranVerse.data ? (
        <View flex={1} backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} >
            <Box paddingBottom={50} alignSelf={"center"}>
                <Heading style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} fontSize="xl" p="4" pb="3">Ayah</Heading>
                <FlatList
                    data={quranVerse.data.ayahs}
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
    ) : <Box></Box>
};
export default QuranChapterScreen;