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
import {useState} from 'react';
import {Icon} from 'react-native-elements';
import ChatItem from '../../components/ChatItem';

const Chat = ({navigation}) => {
  const [message, setMessage] = useState('');
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
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
        <KeyboardAvoidingView
          style={styles.keyboardAvoidView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // keyboardVerticalOffset={'10%'}
        >
          <View style={styles.chatBody}>
            <FlatList
              data={chat}
              renderItem={({item, index}) => (
                <ChatItem
                  id={item.id}
                  message={item.message}
                  sentID={item.sentID}
                />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.chatList}
            />
          </View>
          <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Write a message..."
                  placeholderTextColor={'grey'}
                  value={message}
                  onChangeText={text => setMessage(text)}
                  autoCorrect={false}
                />
                <TouchableOpacity>
                  <Icon
                    name="send"
                    size={28}
                    color={'white'}
                    style={styles.buttonSend}
                  />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderColor: 'green',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  header: {
    width: '100%',
    height: '10%',
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
    // flex: 1,
    justifyContent: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  keyboardAvoidView: {
    flex: 1,
    // justifyContent: 'flex-start',
    // padding: 20,
    paddingBottom: '15%',
    // backgroundColor: 'green',
    borderColor: 'purple',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  chatBody: {
    flex: 1,
    marginBottom: '2%',
    paddingVertical: '2%',
    borderTopColor: '#8D8D8D',
    borderTopWidth: 4,
    borderBottomColor: '#8D8D8D',
    borderBottomWidth: 4,
  },
  chatList: {
    padding: 10,
    // height: '95%',
  },
  inputGroup: {
    // paddingBottom: '15%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginTop: '1.5%',
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    width: '80%',
    // maxWidth: '75%',
    paddingVertical: 12,
    paddingHorizontal: 10,
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

export default Chat;
