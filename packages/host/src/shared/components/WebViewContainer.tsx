import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import WebView from 'react-native-webview';

interface WebViewContainerProps {
  html?: string;
  uri?: string;
  style?: any;
  showLoading?: boolean;
  originWhitelist?: string[];
  onLoadStart?: (event: any) => void;
  onLoadEnd?: (event: any) => void;
  onError?: (event: any) => void;
}

/**
 * WebViewContainer - A reusable WebView component that can be shared with micro apps
 */
const WebViewContainer: React.FC<WebViewContainerProps> = ({
  html,
  uri,
  style,
  showLoading = false,
  originWhitelist = ['*'],
  onLoadStart,
  onLoadEnd,
  onError,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoadStart = (event: any) => {
    setLoading(true);
    onLoadStart && onLoadStart(event);
  };

  const handleLoadEnd = (event: any) => {
    setLoading(false);
    onLoadEnd && onLoadEnd(event);
  };

  const handleError = (event: any) => {
    const { nativeEvent } = event;
    setError(`WebView error: ${nativeEvent.description}`);
    onError && onError(event);
  };

  // Determine source based on props
  const source = html ? { html } : uri ? { uri } : { html: '<html><body><h1>No content provided</h1></body></html>' };

  return (
    <View style={[styles.container, style]}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <WebView
          originWhitelist={originWhitelist}
          source={source}
          style={styles.webview}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          {...props}
        />
      )}
      {(loading || showLoading) && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    // Note: Removed overflow: 'hidden' as per memory to fix shadow issues
  },
  webview: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    zIndex: 999,
  },
  loadingText: {
    marginTop: 10,
    color: 'blue',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default WebViewContainer;
