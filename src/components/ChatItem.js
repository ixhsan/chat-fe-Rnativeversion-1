import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';

const ChatItem = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const user = useSelector(state => state.user);
  const db = useSelector(state => state.db);
  const messagePosition =
    props.sentID === user._id ? styles.senderContainer : '';
  const messageOverlay =
    props.sentID === user._id ? styles.senderOverlay : styles.receiverOverlay;
  const textColor = props.sentID === user._id ? 'white' : 'black';

  const handleSetRemoveMessageID = useCallback(() => {
    props.setRemoveMessageID(prevState => {
      return {
        _id: props._id,
        message: props.message,
        receiverID: db.selectedContact.username,
        chatID: db.selectedChat._id,
        sentStatus: props.sentStatus,
      };
    });
  }, [
    props._id,
    props.sentStatus,
    db.selectedContact.username,
    db.selectedChat._id,
  ]);

  const handleRemoveMessage = () => {
    handleSetRemoveMessageID();
    props.setRemoveModal();
  };

  return (
    <>
      <View style={[styles.container, messagePosition]}>
        <View style={styles.drawerIcon}>
          {props.sentID === user._id && showDrawer && (
            <TouchableOpacity>
              <Icon
                name="delete"
                size={30}
                color={'grey'}
                style={styles.contactIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[messageOverlay, styles.chatItem]}
          onLongPress={handleRemoveMessage}>
          <Text style={[styles.chatText, {color: textColor}]}>
            {props.message}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChatItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatItem: {
    maxWidth: '70%',
    marginVertical: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderRadius: 20,
  },
  chatText: {
    paddingHorizontal: 10,
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'auto',
  },
  senderOverlay: {
    backgroundColor: '#1C94F7',
  },
  receiverOverlay: {
    backgroundColor: '#E7E7E7',
  },
  senderContainer: {
    alignSelf: 'flex-end',
  },
});
