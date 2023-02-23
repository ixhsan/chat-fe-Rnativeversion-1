import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Icon} from 'react-native-elements';
import ChatItem from '../../components/ChatItem';
import CustomModal from '../../components/CustomModal';
import {useDispatch, useSelector} from 'react-redux';
import {deleteMessage, sendMessage} from '../../actions/action';

const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const db = useSelector(state => state.db);
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [inputText, setInputText] = useState('');

  const [showRemoveModal, setRemoveModal] = useState(false);
  const [removeMessageID, setRemoveMessageID] = useState({
    _id: '',
    message: '',
    receiverID: '',
    chatID: '',
    sentStatus: '',
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSendMessage = () => {
    dispatch(
      sendMessage({
        message: inputText,
      }),
    );
    setInputText('');
    Keyboard.dismiss();
    Animated.timing(scrollY, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleScrollToBottom = () => {
    Animated.timing(scrollY, {
      toValue: flatListRef.current?.scrollToEnd({animated: true}),
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleDeleteYES = useCallback(() => {
    const payload = {
      _id: removeMessageID._id,
      receiverID: removeMessageID.receiverID,
      chatID: removeMessageID.chatID,
    };
    dispatch(deleteMessage(payload, removeMessageID.sentStatus));
    setTimeout(() => {
      setRemoveMessageID({
        _id: '',
        message: '',
        receiverID: '',
        chatID: '',
        sentStatus: '',
      });
    }, 500);
    setRemoveModal(false);
  }, [removeMessageID, dispatch]);

  const handleDeleteNO = () => {
    setTimeout(() =>
      setRemoveMessageID({
        _id: '',
        message: '',
        receiverID: '',
        chatID: '',
        sentStatus: '',
      }),
    );
    setRemoveModal(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Icon
                name={'arrow-back'}
                size={28}
                color={'#8D8D8D'}
                style={styles.buttonBack}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>
              {db.selectedContact?.username
                ? db.selectedContact?.username
                : "Receiver's Name"}
            </Text>
          </View>
          <View style={styles.chatBody}>
            {db.selectedContact._id && (
              <Animated.FlatList
                ref={flatListRef}
                data={db.selectedChat.conversation}
                renderItem={({item, index}) => (
                  <ChatItem
                    _id={item._id}
                    message={item.message}
                    sentID={item.sentID}
                    receiverID={item.receiverID}
                    sentStatus={item.sentStatus}
                    readStatus={item.readStatus}
                    deleteStatus={item.deleteStatus}
                    sentTime={item.createdAt}
                    setRemoveModal={() =>
                      setRemoveModal(prevState => !prevState)
                    }
                    setRemoveMessageID={setRemoveMessageID}
                  />
                )}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.chatList}
                onContentSizeChange={handleScrollToBottom}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollY}}}],
                  {useNativeDriver: true},
                )}
              />
            )}
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.textInput}
                placeholder="Write a message..."
                placeholderTextColor={'grey'}
                value={inputText}
                onChangeText={text => setInputText(text)}
              />
              <TouchableOpacity onPress={handleSendMessage}>
                <Icon
                  name="send"
                  size={24}
                  color={'white'}
                  style={styles.buttonSend}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        <CustomModal
          visible={showRemoveModal}
          onConfirm={handleDeleteYES}
          onClose={handleDeleteNO}
          title="Delete Message"
          message="Are you sure you want to delete this message?"
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: '#FFFFFF',
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  header: {
    width: '100%',
    height: '10%',
    minHeight: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '2%',
    borderTopColor: '#8D8D8D',
    borderTopWidth: 2,
    borderBottomColor: '#8D8D8D',
    borderBottomWidth: 2,
  },
  buttonBack: {
    padding: '8%',
    maxWidth: '55%',
    borderRadius: 10,
    borderColor: '#8D8D8D',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  headerText: {
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  chatBody: {
    flex: 1,
    paddingVertical: '2%',
    borderTopColor: '#8D8D8D',
    borderTopWidth: 4,
    borderBottomColor: '#8D8D8D',
    borderBottomWidth: 4,
  },
  chatList: {
    padding: 10,
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: '2%',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: '1%',
  },
  textInput: {
    width: '80%',
    paddingVertical: '3%',
    paddingHorizontal: '5%',
    fontSize: 16,
    color: 'black',
    borderRadius: 20,
    borderColor: '#8D8D8D',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  buttonSend: {
    padding: 10,
    backgroundColor: '#1C94F7',
    borderRadius: 30,
  },
  buttonAddText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    display: 'none',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Chat;
