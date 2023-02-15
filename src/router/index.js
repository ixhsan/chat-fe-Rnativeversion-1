import Contact from '../pages/Contact';
import Login from '../pages/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
