import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage: Message = {
      id: `${Date.now()}`,
      text: inputText,
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const updatedMessages = [...messages, userMessage];
    setInputText("");
    const API_KEY = process.env.OPEN_AI_API_KEY;

    const newInput = updatedMessages.map((msg) => ({
      role: msg.sender,
      content: msg.text,
    }));
    console.log(`Sending message to GPT-4: ${JSON.stringify(newInput)}`);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo-16k",
          messages: updatedMessages.map((msg) => ({
            role: msg.sender,
            content: msg.text,
          })),
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage: Message = {
        id: `${Date.now() + 1}`,
        text: response.data.choices[0].message.content,
        sender: "assistant",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message to GPT-4:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={item.sender === "user" ? styles.userMessage : styles.botMessage}
    >
      {item.text === "loading" ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Text>{item.text}</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 100}
    >
      <FlatList
        data={
          loading
            ? [
                ...messages,
                { id: "loading", text: "loading", sender: "assistant" },
              ]
            : messages
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, marginBottom: 10 }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask our AI Mechanic here..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1f7c4",
    padding: 12,
    marginVertical: 4,
    borderRadius: 20,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#D0F5FF",
    padding: 12,
    marginVertical: 4,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "black",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "OktahRound-Regular",
  },
  loadingContainer: {
    alignSelf: "flex-start",
    padding: 12,
    marginVertical: 4,
  },
});

export default ChatScreen;
