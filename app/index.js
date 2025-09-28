import { StyleSheet, View } from 'react-native';

import { Button, Stack as MaterialStack } from "@react-native-material/core";
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
        <MaterialStack>
            <View style={styles.buttonContainer}>
                <Button title="Celsius a Fahrenheit" style={styles.formButton} 
                onTouchEnd={() => router.push('/ConvertTemperatureForm')} />
            </View>
        </MaterialStack>
  );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 20,
        marginRight: 40,
        marginLeft: 40,
    },
    formButton: {
        shadowOffset: 0,
    }
});