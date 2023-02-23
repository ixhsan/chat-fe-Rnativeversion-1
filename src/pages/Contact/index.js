import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icon} from 'react-native-elements';
import ContactItem from '../../components/ContactItem';
import CustomModal from '../../components/CustomModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  addContact,
  deleteMessageNotice,
  loadUserData,
  receiveMessage,
  selectContact,
  updateReadNotice,
} from '../../actions/action';
import {
  closeSocket,
  connectSocket,
  offSocket,
  signOut,
} from '../../actions/action.auth';

const Contact = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {socket} = useSelector(state => state.user);
  const db = useSelector(state => state.db);

  const [showLogOut, setShowLogout] = useState(false);
  const [newContact, setNewContact] = useState('');
  // const [contacts, setContacts] = useState([]);
  const [contactActive, setContactActive] = useState(null);

  useEffect(() => {
    dispatch(loadUserData());
    dispatch(connectSocket());
    return () => {
      dispatch(closeSocket('connect'));
    };
  }, []);

  useEffect(() => {
    console.log('state db', db);
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('receive-chat', payload => {
        dispatch(receiveMessage(payload));
      });
      socket.on('receive-delete-notice', payload => {
        console.log('payload dari send-delete-notice', payload);
        dispatch(deleteMessageNotice(payload));
      });
      socket.on('receive-read-notice', ({payload}) => {
        console.log('payload dari receive-read-notice', payload);
        dispatch(updateReadNotice(payload));
      });
      return () => {
        dispatch(offSocket('receive-chat'));
        dispatch(offSocket('receive-delete-notice'));
        dispatch(offSocket('receive-read-notice'));
      };
    }
  }, [socket, dispatch]);

  const handleAddContact = async () => {
    console.log('state db', db)
    if (newContact === '' || newContact === user.username) return;
    dispatch(addContact(newContact.toLowerCase()));
    setNewContact('');
  };

  const handleSelectContact = (contact, chatID) => {
    setContactActive(contact.username);
    dispatch(selectContact(contact, chatID));
  };

  const handleLogOutNO = () => {
    setShowLogout(false);
  };

  const handleLogOutYES = () => {
    dispatch(signOut());
    setShowLogout(false);
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Chats</Text>
          <Text style={styles.textHeaderSecondary}>Welcome, Ikhsan</Text>
        </View>
        <View style={styles.inputBody}>
          <KeyboardAvoidingView style={styles.inputGroup}>
            <Icon
              name="person-add-alt"
              size={20}
              color={'grey'}
              style={styles.addIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Insert username..."
              placeholderTextColor={'grey'}
              value={newContact}
              onChangeText={text => setNewContact(text)}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.buttonAdd} onPress={handleAddContact}>
            <Text style={styles.buttonAddText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactBody}>
          <FlatList
            data={db.contacts}
            renderItem={({item, index}) => (
              <ContactItem
                _id={item._id}
                chatID={item.chatID}
                name={item.username}
                unread={item.unreadCount}
                navigation={navigation}
                contactActive={contactActive}
                setActive={() =>
                  handleSelectContact(
                    {
                      _id: item._id,
                      username: item.username,
                      name: item.name,
                      unreadCount: item.unreadCount,
                    },
                    item.chatID,
                  )
                }
              />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.contactList}
          />
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.buttonLogOut}
            onPress={() => setShowLogout(true)}>
            <Text style={styles.buttonLogOutText}>LOG OUT</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomModal
        visible={showLogOut}
        onConfirm={handleLogOutYES}
        onClose={handleLogOutNO}
        title="Log Out"
        message="End this session?"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: '100%',
    maxWidth: '100%',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    paddingVertical: 10,
  },
  textHeader: {fontSize: 36, fontWeight: 'bold'},
  textHeaderSecondary: {fontSize: 18},
  inputBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'left',
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
  textInput: {
    maxWidth: '75%',
    color: 'black',
  },
  buttonAdd: {
    marginLeft: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1C94F7',
    borderRadius: 10,
  },
  buttonAddText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  contactBody: {
    height: '75%',
    marginVertical: '2.75%',
    borderTopColor: '#8D8D8D',
    borderTopWidth: 4,
    borderBottomColor: '#8D8D8D',
    borderBottomWidth: 4,
  },
  contactList: {
    marginVertical: '2%',
  },
  footer: {
    padding: '2%',
  },
  buttonLogOut: {
    alignSelf: 'center',
    paddingVertical: '3%',
    paddingHorizontal: '8%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
  },
  buttonLogOutText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
});

export default Contact;
