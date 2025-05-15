import React from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import { Linking, View, StyleSheet, Text } from 'react-native';
import { useEffect, useState, useRef, createContext, useContext } from 'react';
import { Button } from 'react-native-paper';

// Define auth context type
type AuthContextType = {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
};

// Create a simple auth context for the host app
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
});

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Styles for SignInScreen
const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B5E20',
  },
  button: {
    width: '80%',
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
});

// Custom SignInScreen that takes signIn function as prop
const SignInScreen = ({ onSignIn }: { onSignIn: () => void }) => {
  const handleSignIn = () => {
    console.log('SignInScreen: handleSignIn called');
    onSignIn();
  };

  console.log('SignInScreen rendered');

  return (
    <View style={signInStyles.container}>
      <Text style={signInStyles.title}>VCB Super App</Text>
      <Button
        mode="contained"
        style={signInStyles.button}
        onPress={handleSignIn}>
        Sign In
      </Button>
    </View>
  );
};

// Simple auth provider component
const LocalAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Memoize the context value to prevent unnecessary re-renders
  const authContext = React.useMemo(() => ({
    isAuthenticated,
    signIn: () => {
      console.log('AuthContext: signIn called');
      setIsAuthenticated(true);
    },
    signOut: () => {
      console.log('AuthContext: signOut called');
      setIsAuthenticated(false);
    },
  }), [isAuthenticated]);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

// Main app component that will be wrapped with LocalAuthProvider
const MainApp = () => {
  const [pendingDeepLink, setPendingDeepLink] = useState<string | null>(null);
  const navigationRef = useRef(null);
  const { isAuthenticated, signIn, signOut } = useAuth(); // Get all auth context values

  // Define navigateToDeepLink function with useCallback
  const navigateToDeepLink = React.useCallback((url: string) => {
    // Phân tích URL để xác định mini app và màn hình cần điều hướng
    // Ví dụ: vcbsuperapp://booking/upcoming
    const regex = /vcbsuperapp:\/\/([^/]+)(?:\/([^/]+))?/;
    const match = url.match(regex);

    if (match && navigationRef.current) {
      const [, miniApp, screen] = match;
      const nav = navigationRef.current as any;

      switch (miniApp) {
        case 'booking':
          nav.navigate('Booking', { screen: screen || 'Home' });
          break;
        case 'shopping':
          nav.navigate('Shopping', { screen: screen || 'Home' });
          break;
        case 'vcbemployeeob':
          // Khi deep link từ VCBEmployeeOB, điều hướng đến màn hình Booking
          console.log('Deep link from VCBEmployeeOB to Booking');
          nav.navigate('Booking', { screen: screen || 'Home' });
          break;
        // Thêm các mini app khác
      }
    }
  }, []);

  // Define handleUrl function with useCallback to avoid recreation on each render
  const handleUrl = React.useCallback((url: string) => {
    // Nếu chưa đăng nhập, lưu deeplink để xử lý sau
    if (!isAuthenticated) {
      setPendingDeepLink(url);
      // We'll handle navigation after authentication
    } else {
      // Đã đăng nhập, xử lý deeplink ngay
      navigateToDeepLink(url);
    }
  }, [isAuthenticated, navigateToDeepLink]);

  // Xử lý deeplink khi ứng dụng đã mở
  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      if (url) {
        handleUrl(url);
      }
    };

    // Lắng nghe sự kiện deeplink - React Native 0.65+ API
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Kiểm tra nếu ứng dụng được mở bởi deeplink
    Linking.getInitialURL().then(url => {
      if (url) {
        handleUrl(url);
      }
    });

    return () => {
      // Cleanup listener
      subscription.remove();
    };
  }, [handleUrl]);

  // Xử lý điều hướng sau khi đăng nhập thành công
  useEffect(() => {
    if (isAuthenticated && pendingDeepLink && navigationRef.current) {
      navigateToDeepLink(pendingDeepLink);
      setPendingDeepLink(null);
    }
  }, [isAuthenticated, pendingDeepLink, navigateToDeepLink]);


  return (
    <React.Suspense fallback={<SplashScreen />}>
      {!isAuthenticated ? (
        <React.Suspense fallback={<SplashScreen />}>
          <SignInScreen onSignIn={signIn} />
        </React.Suspense>
      ) : (
        <NavigationContainer
          ref={navigationRef}
          onReady={() => RNBootSplash.hide({fade: true})}>
          <MainNavigator />
        </NavigationContainer>
      )}
    </React.Suspense>
  );
};

// Root App component
const App = () => {
  // Manage auth state directly in App component
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Create auth context value
  const authContextValue = React.useMemo(() => ({
    isAuthenticated,
    signIn: () => {
      console.log('App: signIn called');
      setIsAuthenticated(true);
    },
    signOut: () => {
      console.log('App: signOut called');
      setIsAuthenticated(false);
    },
  }), [isAuthenticated]);

  return (
    <ErrorBoundary name="AuthProvider">
      <AuthContext.Provider value={authContextValue}>
        <MainApp />
      </AuthContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
