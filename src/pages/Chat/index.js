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
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.buttonBack}
            onPress={() => navigation.goBack()}>
            <Icon
              name={'arrow-back'}
              size={28}
              style={styles.buttonBackIcon}
              color={'#8D8D8D'}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Receiver's Name</Text>
        </View>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform === 'ios' ? 'padding' : null}
          enabled>
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
          <View style={styles.inputBody}>
            <View style={styles.inputGroup}>
              <TextInput
                style={styles.chatInput}
                placeholder="Write a message..."
                placeholderTextColor={'grey'}
                value={message}
                onChangeText={text => setMessage(text)}
              />
            </View>
            <TouchableOpacity>
              <Icon
                name="send"
                size={30}
                color={'white'}
                style={styles.buttonChatIcon}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100%',
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    padding: 10,
    backgroundColor: '#FFFFFF',
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  header: {
    // flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 4,
    borderTopColor: '#8D8D8D',
    borderTopWidth: 2,
    borderBottomColor: '#8D8D8D',
    borderBottomWidth: 2,
  },
  buttonBack: {
    flex: 1,
    maxWidth: '14%',
    height: '100%',
    maxHeight: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#8D8D8D',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  buttonBackIcon: {
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 28,
    fontWeight: 'bold',
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  keyboardAvoidingView: {
    flex: 1,
    // margin: 0,
    // padding: 0,
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  chatBody: {
    height: '90%',
    marginBottom: '2%',
    borderTopColor: '#8D8D8D',
    borderTopWidth: 4,
    borderBottomColor: '#8D8D8D',
    borderBottomWidth: 4,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  chatList: {
    width: '100%',
    minWidth: '100%',
    maxWidth: '100%',
    padding: 10,
    // borderTopColor: '#8D8D8D',
    // borderTopWidth: 4,
    // borderBottomColor: '#8D8D8D',
    // borderBottomWidth: 4,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  inputBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#8D8D8D',
    borderWidth: 2,
    borderStyle: 'solid',
    marginRight: 5,
  },
  addIcon: {
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  chatInput: {
    height: 45,
    width: '80%',
    maxWidth: '75%',
    paddingVertical: 5,
    color: 'black',
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
  },
  buttonChat: {
    // height: 45,
    marginLeft: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1C94F7',
  },
  buttonChatIcon: {
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
