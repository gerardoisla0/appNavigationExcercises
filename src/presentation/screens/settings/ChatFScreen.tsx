import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useAuthStore } from '../../hooks/useAuthStore';
import firestore from '@react-native-firebase/firestore'
import { FlatList } from 'react-native-gesture-handler';

export const ChatFScreen = () => {

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const { user } = useAuthStore();

  useEffect(()=> {
    //LLamar a firebase RS
    const messageRef = firestore().collection('messages');

    const firebaseMessages = messageRef
                .orderBy('timestamp','asc')
                .onSnapshot( snapshot => {
                    const loadMessages = snapshot.docs.map(doc => doc.data());
                    setMessages(loadMessages);
                }
            );
    return () => firebaseMessages();
  },[])

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = {
      user: user?.fullName, 
      message: message,
      timestamp: Date.now(), 
    };

    const response = await fetch('http://192.168.18.22:3000/api/notification/fs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    if (response.ok) {
      setMessage('');
    } else {
      console.error('Error enviando el mensaje');
    }

  }

  const isCurrentUser = (message: any) => {
    return message.user === user?.fullName;
  };

  return (
   <View style={styles.container} >
    <FlatList
      data = {messages}
    renderItem={({item}) => (
      <View
      style={
        [styles.messageContainer,
          isCurrentUser(item) ? styles.currentUserMessage : styles.otherUserMessage
        ]
      }
      >
        {!isCurrentUser(item) && <Text style={styles.senderName}>{item.user}</Text>}
      <Text style={styles.message}>{item.message}</Text>
      </View>
      
    )}

    keyExtractor={(item) => item.timestamp.toString()}
    />

    <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje"
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    
   </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    maxWidth: '80%', // Limita el ancho del mensaje
  },
  currentUserMessage: {
    backgroundColor: '#007bff', // Azul para el mensaje del usuario
    alignSelf: 'flex-end', // Alinea a la derecha
    marginRight: 10,
  },
  otherUserMessage: {
    backgroundColor: '#000000', // Gris para los mensajes de otros usuarios
    alignSelf: 'flex-start', // Alinea a la izquierda
    marginLeft: 10,
  },
  message: {
    fontSize: 16,
    color: '#fff', // Color del texto para el mensaje (blanco en el mensaje del usuario)
  },
  senderName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});