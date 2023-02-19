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
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import ChatItem from '../../components/ChatItem';
import CustomModal from '../../components/CustomModal';

const Chat = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [showRemove, setRemove] = useState(false);
  const [chat, setChat] = useState([
    {
      id: 1,
      message: 'Tes 1 2 3',
      sentID: 'fajar',
    },
    {
      id: 2,
      message:
        'the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog,',
      sentID: 'fajar',
    },
    {
      id: 3,
      message:
        'the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog,',
      sentID: 'ikhsan',
    },
    {
      id: 4,
      message: 'Bismillah',
      sentID: 'ikhsan',
    },
    {
      id: 5,
      message: 'haha',
      sentID: 'fajar',
    },
    {
      id: 6,
      message: 'masuk masuk',
      sentID: 'ikhsan',
    },
    {
      id: 7,
      message: 'okey masuk',
      sentID: 'ikhsan',
    },
    {
      id: 8,
      message: 'berhasil',
      sentID: 'fajar',
    },
    {
      id: 9,
      message:
        'the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog,',
      sentID: 'ikhsan',
    },
    {
      id: 10,
      message: 'bismillah',
      sentID: 'fajar',
    },
    {
      id: 11,
      message: 'okey masuk',
      sentID: 'ikhsan',
    },
    {
      id: 12,
      message: 'berhasil',
      sentID: 'fajar',
    },
    {
      id: 13,
      message:
        'the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog, the quick brown fox jumps over the lazy dog,',
      sentID: 'ikhsan',
    },
  ]);

  const handleDeleteNO = () => {
    setRemove(false);
  };

  const handleDeleteYES = () => {
    // Perform the delete action
    setRemove(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.content}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // keyboardVerticalOffset={'10%'}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name={'arrow-back'}
                size={28}
                color={'#8D8D8D'}
                style={styles.buttonBack}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Receiver's Name</Text>
          </View>
          <View style={styles.chatBody}>
            <FlatList
              data={chat}
              renderItem={({item, index}) => (
                <ChatItem
                  id={item.id}
                  message={item.message}
                  sentID={item.sentID}
                  setRemove={() => setRemove(prevState => !prevState)}
                />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.chatList}
            />
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.textInput}
                placeholder="Write a message..."
                placeholderTextColor={'grey'}
                value={message}
                onChangeText={text => setMessage(text)}
              />
              <TouchableOpacity>
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
          visible={showRemove}
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
