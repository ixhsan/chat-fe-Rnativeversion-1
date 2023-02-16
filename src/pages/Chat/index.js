import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Chat = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Chat Page</Text>
        <TouchableOpacity
          style={{width: 75, backgroundColor: 'orange'}}
          onPress={() => navigation.goBack()}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100%',
    maxWidth: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderColor: 'purple',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  header: {},
});

export default Chat;
