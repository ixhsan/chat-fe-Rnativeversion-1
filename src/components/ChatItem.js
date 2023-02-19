import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';

const ChatItem = ({id, message, sentID, setRemove}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const messagePosition = sentID === 'ikhsan' ? styles.senderContainer : '';
  const messageOverlay =
    sentID === 'ikhsan' ? styles.senderOverlay : styles.receiverOverlay;
  const textColor = sentID === 'ikhsan' ? 'white' : 'black';

  const handleRemoveMessage = () => {
    setRemove();
  };

  return (
    <>
      <View style={[styles.container, messagePosition]}>
        <View style={styles.drawerIcon}>
          {sentID === 'ikhsan' && showDrawer && (
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
          <Text style={[styles.chatText, {color: textColor}]}>{message}</Text>
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
