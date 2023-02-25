import {
  apiAddContact,
  apiGetData,
  apiUpdateReadStatus,
  apiUpdateDeleteStatus,
  apiSendMessage,
} from '../services/user.services';
import {
  ADD_CONTACT_SUCCESS,
  DELETE_MESSAGE,
  DELETE_MESSAGE_FAILED,
  DELETE_MESSAGE_NOTICE,
  DELETE_MESSAGE_UNSENT,
  LOAD_USER_DATA_FAILED,
  LOAD_USER_DATA_SUCCESS,
  RECEIVE_NEW_MESSAGE,
  RESEND_MESSAGE,
  SELECT_CONTACT,
  UPDATE_READ_NOTICE,
  SEND_MESSAGE_SOCKET,
  SEND_NEW_MESSAGE_BE_FAILED,
  SEND_NEW_MESSAGE_BE_SUCCESS,
  SEND_NEW_MESSAGE_FE,
  UPDATE_READ_STATUS,
  UNSELECT_DATA,
} from './types';

export const loadUserData = () => async (dispatch, getState) => {
  try {
    const {isLoggedIn, username} = getState().user;
    //. Check first if there's a login session
    if (isLoggedIn) {
      //. If it is, Fetch data from api to get user's data
      const response = await apiGetData(username);
      if (!response.data.success) throw response;
      //. If request succeeded, map over the data responses to count for number of unread messages
      const newResponse = response.data.data.contacts.map(contact => {
        let unreadCount = 0;

        response.data.data.chats.forEach(chat => {
          if (chat.contactName.split('$_&_$').includes(contact.username)) {
            unreadCount += chat.conversation.filter(
              message => !message.readStatus && message.sentID === contact._id,
            ).length;
          }
        });

        return {
          ...contact,
          unreadCount,
        };
      });
      //. then dispatch action to update the db state with user's data
      dispatch({
        type: LOAD_USER_DATA_SUCCESS,
        payload: {
          contacts: newResponse,
          chats: response.data.data.chats,
        },
      });
    }
  } catch (error) {
    console.log(
      `LOAD USER DATA FAILED\nError\t: ${error.name}\nCode\t: ${error.code}\nMessage\t: ${error.message}`,
    );
    dispatch({
      type: LOAD_USER_DATA_FAILED,
      error,
    });
  }
};

export const addContact =
  (contactUsername, chatID = null, isUnknownContact = null) =>
  async (dispatch, getState) => {
    const username = getState().user.username;
    try {
      const getContact = await apiAddContact(username, {
        contactUsername,
        chatID,
      });
      if (!getContact.data.success) throw getContact;
      dispatch({
        type: ADD_CONTACT_SUCCESS,
        payload: {
          contact: getContact.data.data.contact,
          chat: getContact.data.data.chat,
          isUnknownContact,
        },
      });
    } catch (error) {
      console.log(
        `ADD CONTACT FAILED\nError\t: ${error.name}\nCode\t: ${error.code}\nMessage\t: ${error.message}`,
      );
    }
  };

export const selectContact =
  (contact, chatID) => async (dispatch, getState) => {
    console.log('selectcontact - sedang mengeset contact', contact);
    let contactData;
    const state = getState().db;
    try {
      if (!chatID) {
        contactData = state.chat.filter(item =>
          item.contactName.split('$_&_$').includes(contact.username),
        );
      } else {
        contactData = state.chat.filter(item => item._id === chatID);
      }

      let unreadMessageData = contactData[0].conversation.filter(
        item => !item.readStatus && item.sentID === contact._id,
      );
      console.log(
        'selectcontact - sedang menghitung jika ada message unread',
        unreadMessageData,
      );
      let unreadMessageIDs = unreadMessageData.map(contact => contact._id);

      if (unreadMessageData.length > 0) {
        dispatch(updateReadStatus(unreadMessageIDs));
      }

      dispatch({
        type: SELECT_CONTACT,
        payload: {
          contact,
          chat: contactData[0],
        },
      });

      // Make an array of data for any unread messages
    } catch (error) {
      console.log('error saat select contact', error);
    }
  };

export const unselectContact = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNSELECT_DATA,
    });
  } catch (error) {
    console.log('error saat kembali', error);
  }
};

export const sendMessage = payload => async (dispatch, getState) => {
  const state = getState();
  const _id = Date.now();
  const chatID = state.db.selectedChat._id;

  //. re-Organize payload to include ID
  const newPayload = {
    message: payload.message,
    sentID: state.user._id,
    receiverID: state.db.selectedContact._id,
    sentStatus: true,
    readStatus: false,
    deleteStatus: false,
  };

  try {
    //. Update the message state
    dispatch({
      type: SEND_NEW_MESSAGE_FE,
      payload: {
        _id,
        ...newPayload,
      },
    });

    //. Store message into database via API
    const sendChat = await apiSendMessage(chatID, newPayload);
    if (!sendChat.data.success) throw sendChat;
    dispatch({
      type: SEND_NEW_MESSAGE_BE_SUCCESS,
      payload: {
        messageID: _id,
        response: sendChat.data.data,
      },
    });

    //. update the payload with the new ID from database
    newPayload._id = sendChat.data.data.message._id;
    //. Send Message through socket.io
    dispatch(sendMessageSocket(newPayload));
  } catch (error) {
    console.log(
      `SEND MESSAGE FAILED\nError\t: ${error.name}\nCode\t: ${error.code}\nMessage\t: ${error.message}`,
    );
    newPayload.sentStatus = false;
    dispatch({
      type: SEND_NEW_MESSAGE_BE_FAILED,
      payload: {
        messageID: _id,
      },
    });
  }
};

const sendMessageSocket = payload => async (dispatch, getState) => {
  const state = getState();
  const socket = getState().user.socket;
  try {
    //. include chat ID into the payload
    payload.chatID = state.db.selectedChat._id;
    //. update the the sender and receiver IDs with username
    payload.sentID = state.user.username;
    payload.receiverID = state.db.selectedContact.username;

    socket.emit('send-chat', payload);

    dispatch({
      type: SEND_MESSAGE_SOCKET,
    });
  } catch (error) {
    console.log('SEND MESSAGE SOCKET FAILED', error);
  }
};

export const resendMessageRedux =
  (_id, payload) => async (dispatch, getState) => {
    const chatID = getState().db.selectedChat._id;
    try {
      const sendChat = await apiSendMessage(chatID, payload);
      if (!sendChat.data.success) throw sendChat;
      dispatch({
        type: RESEND_MESSAGE,
        payload: {
          messageID: _id,
          response: sendChat.data.data,
        },
      });

      //. update the payload with the new ID from database
      payload._id = sendChat.data.data.message._id;
      //. Send Message through socket.io
      dispatch(sendMessageSocket(payload));
    } catch (error) {
      console.log('RESEND MESSAGE FAILED', error);
    }
  };

export const receiveMessage = payload => async (dispatch, getState) => {
  console.log('🚀 ~ file: action.js:232 ~ receiveMessage ~ payload', payload);
  const user = getState().user;
  const db = getState().db;
  const chatID = payload.chatID;
  delete payload.chatID;
  try {
    //. Check if contact exist in contact list
    if (
      db.contacts.filter(item => item.username === payload.sentID).length === 0
    ) {
      // if no, then add as new contact
      //. this way, contact info as well as the latest message will be included in the addContact payload automatically
      await dispatch(addContact(payload.sentID, chatID, true));
    } else {
      payload.receiverID = user._id;

      //. Dispatch an action to update state with the new message,
      dispatch({
        type: RECEIVE_NEW_MESSAGE,
        payload: {
          message: payload,
          chatID,
        },
      });
    }

    //. Check if user currently seeing the same chatID where message intended on being delivered to,
    if (db.selectedChat._id === chatID) {
      dispatch(updateReadStatus([payload._id]));
    }
  } catch (error) {
    console.log('ERROR OCCURED WHEN RECEIVING MESSAGE', error);
  }
};

//. notification that message has been read by receiver
export const updateReadStatus = messageIDs => async (dispatch, getState) => {
  const socket = getState().user.socket;
  console.log(
    'updatereadnotice - berikut id message yang akan di update read statusnya',
    messageIDs,
  );
  try {
    const updatedMessageIDs = await apiUpdateReadStatus(messageIDs);
    if (!updatedMessageIDs.data.success) throw updatedMessageIDs;

    dispatch({
      type: UPDATE_READ_STATUS,
      payload: {
        newMessageIDs: updatedMessageIDs.data.data,
      },
    });

    const newPayload = {
      sentID: getState().user.username,
      receiverID: getState().db.selectedContact.username,
      payload: {
        newMessageIDs: updatedMessageIDs.data.data,
        chatID: getState().db.selectedChat._id,
      },
    };

    socket.emit('send-read-notice', newPayload);
  } catch (error) {
    console.log('ERROR WHEN UPDATING READ STATUS', error);
  }
};

//. send notice that message has been read to the sender
export const updateReadNotice = payload => async (dispatch, getState) => {
  console.log(
    'sendreadnotice - berikut adalah payload yang akan dikirim kembali pada sender',
    payload,
  );

  try {
    dispatch({
      type: UPDATE_READ_NOTICE,
      payload,
    });
  } catch (error) {
    console.log('ERROR WHEN SENDING READ NOTICE', error);
  }
};

export const deleteMessage =
  (payload, sentStatus) => async (dispatch, getState) => {
    const socket = getState().user.socket;
    try {
      //. if it is a sent message
      if (sentStatus) {
        //. send API request to delete message
        const deleteChatItem = await apiUpdateDeleteStatus(payload._id);
        console.log('deletemessage - sent true payload', deleteChatItem);
        if (!deleteChatItem.data.success) throw deleteChatItem;
        //. update local state for deletion of message
        dispatch({
          type: DELETE_MESSAGE,
          payload: deleteChatItem.data.data,
        });
        //. send read notice back to the other person
        socket.emit('send-delete-notice', payload);
      } else {
        //. else, if if its an unsent message
        console.log('deletemessage - sent false payload', payload);
        //. update local state to remove the message directly
        dispatch({
          type: DELETE_MESSAGE_UNSENT,
          payload,
        });
      }
    } catch (error) {
      console.log('ERROR WHEN DELETING MESSAGE', error);
      dispatch({
        type: DELETE_MESSAGE_FAILED,
        error,
      });
    }
  };

export const deleteMessageNotice = payload => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_MESSAGE_NOTICE,
      payload,
    });
  } catch (error) {
    console.log('ERROR WHEN SENDING DELETE NOTICE', error);
  }
};
