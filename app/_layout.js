import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppBar } from "@react-native-material/core";
import { Stack } from 'expo-router';

export default function StackLayout() {
    return (
        <SafeAreaView spacing={5} style={styles.container}>
            <AppBar title="Temperature Converter" />
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});