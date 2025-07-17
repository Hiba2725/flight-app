// app/signup.js
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, database } from '../config/firebase';

export default function SignupScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });

  const handleSignup = async () => {
    const { name, username, email, password } = form;

    if (!email || !password || !username || !name) {
      alert('Please fill all fields');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info in Realtime DB
      await set(ref(database, `users/${user.uid}`), {
        name,
        username,
        email,
        uid: user.uid,
      });

      alert('Signup successful!');
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error.message);
      alert(error.message);
    }
  };

  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <TextInput placeholder="Name" style={styles.input} onChangeText={val => setForm({ ...form, name: val })} />
        <TextInput placeholder="Username" style={styles.input} onChangeText={val => setForm({ ...form, username: val })} />
        <TextInput placeholder="Email" style={styles.input} onChangeText={val => setForm({ ...form, email: val })} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={val => setForm({ ...form, password: val })} />
        
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* 👇 Already have account line */}
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5faff',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    elevation: 5,
  },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 8 },
  button: { backgroundColor: '#0066cc', padding: 14, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  loginText: { marginTop: 16, textAlign: 'center', color: '#555' },
  loginLink: { color: '#0066cc', fontWeight: 'bold' },
});
