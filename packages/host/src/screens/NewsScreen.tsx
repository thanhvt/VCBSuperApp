import React from 'react';
import { View } from 'react-native';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const News = React.lazy(() => import('news/App'));

const NewsScreen = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <ErrorBoundary name="NewsScreen">
      <React.Suspense
        fallback={<Placeholder label="News and Articles" icon="newspaper" />}>
        <SafeAreaProvider>
          <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
            <News />
          </View>
        </SafeAreaProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default NewsScreen;
