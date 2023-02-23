import React from "react";
import { NativeBaseProvider, Box, Center} from "native-base";
import { useColorScheme } from "react-native";

const EventScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                </Box>
            </Center>
        </NativeBaseProvider>

    )
};
export default EventScreen;