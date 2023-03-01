import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height, scale} = Dimensions.get('window');

const CustomModal = ({visible, onClose, title, message, onConfirm, value}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View style={styles.contentContainer}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textMessage}>{message}</Text>
            {value && (
              <View style={styles.valueContainer}>
                <Text
                  style={[
                    styles.textMessage,
                    {color: 'white', marginBottom: 0},
                  ]}>
                  {value}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
  },
  contentContainer: {
    marginBottom: '5%',
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '4%',
  },
  textMessage: {
    fontSize: 16,
    marginBottom: '4%',
  },
  valueContainer: {
    backgroundColor: '#2196F3',
    padding: '5%',
    borderRadius: scale * 0.8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomModal;

// const Modal = ({navigation, route}) => {
//   const {modalMode, id} = route.params;
//   const [textHeader, setTextHeader] = useState(`Insert text header`);
//   const [textBody, setTextBody] = useState(`Insert text header`);
//   const [callback, setCallback] = useState(null);

//   if (modalMode === 'SignOut') {
//     setTextHeader(`LOG OUT`);
//     setTextBody(`Log out current session?`);
//     setCallback(() => navigation.navigate('Login'));
//   } else if (modalMode === 'Delete Message') {
//     setTextHeader(`Delete Confirmation`);
//     setTextBody(`Are you sure you're gonna delete this message?\n${id}`);
//   }

//   return (
//     <View style={styles.centeredView}>
//       <View style={styles.modalView}>
//         <Text style={styles.textHeader}>{textHeader}</Text>
//         <Text style={styles.textBody}>{textBody}</Text>
//         <View style={styles.buttonGroup}>
//           <TouchableOpacity
//             style={[styles.button, styles.buttonYes]}
//             onPress={() => callback()}>
//             <Text style={styles.textStyle}>Yes</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.buttonNo]}
//             onPress={() => navigation.goBack()}>
//             <Text style={styles.textStyle}>No</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default Modal;

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
//   },
//   modalView: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     maxWidth: '75%',
//     paddingHorizontal: '4%',
//     paddingVertical: '4%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   textHeader: {
//     fontSize: 20,
//     fontWeight: '700',
//     paddingHorizontal: '6%',
//     paddingVertical: '2%',
//     textAlign: 'center',
//   },
//   textBody: {
//     fontSize: 16,
//     textAlign: 'auto',
//     paddingHorizontal: '5%',
//     paddingVertical: '2%',
//     // borderStyle: 'solid',
//     // borderColor: 'brown',
//     // borderWidth: 1,
//   },
//   buttonGroup: {
//     flexDirection: 'row',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   button: {
//     marginHorizontal: '2%',
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     elevation: 2,
//   },
//   buttonNo: {
//     backgroundColor: 'grey',
//   },
//   buttonYes: {
//     backgroundColor: 'red',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });
