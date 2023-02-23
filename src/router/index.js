import Contact from '../pages/Contact';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Router = () => {
  const {isLoggedIn} = useSelector(state => state.user);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Chat"
            component={Chat}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
