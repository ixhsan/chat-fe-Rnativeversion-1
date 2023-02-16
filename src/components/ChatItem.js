import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatItem = ({id, message, sentID}) => {
  const chatStyle =
    sentID === 'ikhsan' ? styles.chatItemSender : styles.chatItem;
  const textColor = sentID === 'ikhsan' ? 'white' : 'black';

  return (
    <View style={chatStyle}>
      <Text style={[styles.chatText, {color: textColor}]}>{message}</Text>
    </View>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '70%',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  chatItemSender: {
    flexDirection: 'row',
    marginVertical: 5,
    maxWidth: '70%',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#1C94F7',
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  chatText: {
    paddingHorizontal: 10,
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'auto',
  },
});
