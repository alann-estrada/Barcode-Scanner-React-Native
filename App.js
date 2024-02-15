import { SafeAreaView, StatusBar, LogBox } from 'react-native';
import MainStack from './src/helpers/navigation/MainStack';

export default function App() {
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <MainStack />
      </SafeAreaView>
    </>
  );
}
