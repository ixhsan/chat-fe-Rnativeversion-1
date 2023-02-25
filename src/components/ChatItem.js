import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import Markdown from 'react-native-markdown-displayer';
import moment from 'moment';
import {resendMessageRedux} from '../actions/action';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChatItem = props => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const user = useSelector(state => state.user);
  const db = useSelector(state => state.db);

  const isSender = props.sentID === user._id;
  const messagePosition = isSender ? styles.senderContainer : '';
  const messageOverlay = isSender
    ? styles.senderOverlay
    : styles.receiverOverlay;
  const textColor = isSender ? 'white' : 'black';

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
    if (props.deleteStatus) return;
    handleSetRemoveMessageID();
    props.setRemoveModal();
  };

  const handleResendMessage = () => {
    dispatch(
      resendMessageRedux(props._id, {
        message: props.message,
        sentID: props.sentID,
        receiverID: props.receiverID,
        sentStatus: true,
        readStatus: props.readStatus,
        deleteStatus: props.deleteStatus,
      }),
    );
  };

  return (
    <>
      <View style={[styles.container, messagePosition]}>
        <View style={styles.drawerIcon}>
          {isSender && !props.sentStatus && (
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendMessage}>
              <Icon name="replay" size={30} color={'grey'} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={[messageOverlay, styles.chatItem]}
          onLongPress={handleRemoveMessage}>
          <View
            style={{
              flexDirection: props.message.length > 30 ? 'column' : 'row',
            }}>
            <Markdown
              style={{
                body: [
                  styles.chatText,
                  {
                    color: textColor,
                    marginRight:
                      props.message.length > 30 ? 0 : windowWidth * 0.02,
                  },
                ],
              }}>
              {props.message}
            </Markdown>
            <View
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
                {
                  alignSelf: props.message.length > 30 ? 'flex-end' : 'auto',
                },
              ]}>
              <Text
                style={[
                  styles.timeText,
                  {
                    color: isSender ? 'white' : '#747474',
                    marginRight: windowWidth * 0.004,
                  },
                ]}>
                {moment(props.sentTime).format('hh:mm')}
              </Text>
              {isSender && (
                <Icon
                  name={
                    props.readStatus
                      ? 'done-all'
                      : props.sentStatus
                      ? 'done'
                      : 'warning'
                  }
                  size={18}
                  color={
                    props.readStatus
                      ? 'cyan'
                      : props.sentStatus
                      ? 'white'
                      : 'orange'
                  }
                />
              )}
            </View>
          </View>
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
    maxWidth: windowWidth * 0.8,
    marginVertical: 5,
    paddingVertical: windowHeight * 0.005,
    paddingHorizontal: windowWidth * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  chatText: {
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'auto',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'green',
  },
  timeText: {
    alignItems: 'center',
    fontSize: 16,
    textAlign: 'auto',
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'purple',
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
  resendButton: {
    marginRight: windowWidth * 0.02,
  },
});
