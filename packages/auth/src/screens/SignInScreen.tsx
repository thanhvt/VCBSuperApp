import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Avatar,
} from 'react-native-paper';
import {useAuth} from '../contexts/AuthContext';
import GradientBackground from '../components/GradientBackground';

const SignInScreen = () => {
  const {signIn} = useAuth();
  // Using default theme from Paper
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleSignIn = () => {
    // You can add validation here
    signIn();
  };

  return (
    <GradientBackground colors={['#1B5E20', '#2E7D32', '#388E3C']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Avatar.Icon
                size={80}
                icon="bank"
                color="#FFFFFF"
                style={styles.logo}
              />
            </View>
            <Text style={styles.logoText}>VCB</Text>
          </View>

          <View style={styles.formContainer}>
            <Text variant="displaySmall" style={styles.welcomeHeadline}>
              Welcome
            </Text>
            <Text style={styles.welcomeText} variant="bodyLarge">
              Sign in to your VCB account
            </Text>

            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
              mode="flat"
              left={<TextInput.Icon icon="account-outline" color="#2E7D32" />}
              activeUnderlineColor="#2E7D32"
              underlineColor="#C8E6C9"
              selectionColor="#2E7D32"
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={secureTextEntry}
              style={styles.input}
              mode="flat"
              left={<TextInput.Icon icon="lock-outline" color="#2E7D32" />}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? 'eye-off-outline' : 'eye-outline'}
                  color="#2E7D32"
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                />
              }
              activeUnderlineColor="#2E7D32"
              underlineColor="#C8E6C9"
              selectionColor="#2E7D32"
            />

            <Button
              mode="contained"
              style={styles.button}
              contentStyle={styles.buttonContent}
              buttonColor="#2E7D32"
              rippleColor="rgba(255, 255, 255, 0.2)"
              onPress={handleSignIn}
              uppercase>
              Sign In
            </Button>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>or sign in with</Text>
              <View style={styles.divider} />
            </View>

            <Button
              mode="outlined"
              style={styles.alternativeButton}
              icon="bank"
              textColor="#1B5E20"
              onPress={signIn}
              contentStyle={styles.alternativeButtonContent}>
              Vietcombank Digibank
            </Button>

            <Button
              mode="outlined"
              style={styles.alternativeButton}
              icon="shield-account"
              textColor="#1B5E20"
              onPress={signIn}
              contentStyle={styles.alternativeButtonContent}>
              VNeID
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logo: {
    backgroundColor: 'transparent',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  welcomeHeadline: {
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '700',
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#388E3C',
    letterSpacing: 0.5,
  },
  input: {
    marginBottom: 24,
    backgroundColor: 'transparent',
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    marginBottom: 24,
    marginTop: 8,
    height: 56,
    justifyContent: 'center',
    elevation: 4,
  },
  buttonContent: {
    height: 56,
    margin: 0,
    padding: 0,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    // flex: 1,
    height: 1,
    backgroundColor: 'rgba(27, 94, 32, 0.2)',
  },
  dividerText: {
    paddingHorizontal: 16,
    color: '#388E3C',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  alternativeButton: {
    borderRadius: 8,
    marginBottom: 16,
    borderColor: 'rgba(27, 94, 32, 0.3)',
    borderWidth: 1.5,
    height: 52,
  },
  alternativeButtonContent: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  signupButton: {
    marginLeft: -8,
  },
  signupButtonText: {
    color: '#2E7D30',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default SignInScreen;
