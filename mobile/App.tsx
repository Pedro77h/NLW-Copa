import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import { NativeBaseProvider , VStack , Text} from 'native-base'

export default function App() {
  return (
    <NativeBaseProvider>
    <VStack flex={1} bgColor='fuchsia.400'>
      <Text color="black" fontSize={24}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </VStack>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
