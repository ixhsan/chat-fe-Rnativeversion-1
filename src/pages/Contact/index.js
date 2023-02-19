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
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';
import ContactItem from '../../components/ContactItem';
import CustomModal from '../../components/CustomModal';

const Contact = ({navigation}) => {
  const [showLogOut, setShowLogout] = useState(false);
  const [contactID, setContactID] = useState('');
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'fajar',
    },
    {
      id: 2,
      name: 'tantowi',
    },
    {
      id: 3,
      name: 'yaqin',
    },
    {
      id: 4,
      name: 'rahmat',
    },
    {
      id: 5,
      name: 'abang',
    },
    {
      id: 6,
      name: 'ikhsan',
    },
    {
      id: 7,
      name: 'yudi',
    },
    {
      id: 8,
      name: 'gemma',
    },
    {
      id: 9,
      name: 'rifqi',
    },
    {
      id: 10,
      name: 'yudi',
    },
    {
      id: 11,
      name: 'gemma',
    },
    {
      id: 12,
      name: 'rifqi',
    },
  ]);

  const handleLogOutNO = () => {
    setShowLogout(false);
  };

  const handleLogOutYES = () => {
    // Perform the logout action
    navigation.navigate('Login');
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
              value={contactID}
              onChangeText={text => setContactID(text)}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.buttonAddText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactBody}>
          <FlatList
            data={contacts}
            renderItem={({item, index}) => (
              <ContactItem
                no={item.id}
                name={item.name}
                navigation={navigation}
              />
            )}
            keyExtractor={item => item.id}
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
