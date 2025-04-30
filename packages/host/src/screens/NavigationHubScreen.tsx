import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
  Platform,
  Animated,
} from 'react-native';
import { Text, Avatar, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainNavigator';


type NavigationHubScreenProps = {};

type AppTileProps = {
  title: string;
  icon: string;
  color: string;
  gradientColors: string[];
  onPress: () => void;
  index: number;
};

const { width } = Dimensions.get('window');
const TILE_MARGIN = 12;
const TILES_PER_ROW = 2;
const TILE_SIZE = (width - (TILES_PER_ROW + 1) * TILE_MARGIN * 2) / TILES_PER_ROW;

const AppTile = ({ title, icon, gradientColors, onPress, index }: AppTileProps) => {
  // Create animation values for each tile
  const scaleAnim = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    // Stagger the animations based on index
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, [index, scaleAnim]);
  return (
    <Animated.View
      style={[styles.tileContainer, {
        transform: [{ scale: scaleAnim }],
        opacity: scaleAnim,
      }]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={styles.tileWrapper}
        activeOpacity={0.9}
      >
        <Surface style={styles.tileSurface}>
          <View style={[styles.tile, { backgroundColor: gradientColors[0] }]}>
            <View style={styles.tileContent}>
              <Avatar.Icon
                size={64}
                icon={icon}
                style={styles.tileIcon}
                color="white"
              />
              <Text style={styles.tileTitle}>{title}</Text>
            </View>
          </View>
        </Surface>
      </TouchableOpacity>
    </Animated.View>
  );
};

const NavigationHubScreen: React.FC<NavigationHubScreenProps> = () => {
  const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  // Header animation values
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  const apps = [
    {
      title: 'Banking',
      icon: 'bank',
      color: '#1B5E20',
      gradientColors: ['#2E7D32', '#1B5E20'],
      onPress: () => navigation.navigate('Tabs'),
    },
    {
      title: 'Payments',
      icon: 'credit-card',
      color: '#0D47A1',
      gradientColors: ['#1976D2', '#0D47A1'],
      onPress: () => navigation.navigate('Tabs'),
    },
    {
      title: 'Shopping',
      icon: 'shopping',
      color: '#C2185B',
      gradientColors: ['#E91E63', '#C2185B'],
      onPress: () => navigation.navigate('Shopping'),
    },
    {
      title: 'Booking',
      icon: 'calendar-check',
      color: '#E65100',
      gradientColors: ['#F57C00', '#E65100'],
      onPress: () => navigation.navigate('Booking'),
    },
    {
      title: 'News',
      icon: 'newspaper',
      color: '#4527A0',
      gradientColors: ['#673AB7', '#4527A0'],
      onPress: () => navigation.navigate('News'),
    },
    {
      title: 'Dashboard',
      icon: 'view-dashboard',
      color: '#00695C',
      gradientColors: ['#00897B', '#00695C'],
      onPress: () => navigation.navigate('Dashboard'),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1B5E20" />
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=2069' }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.gradientOverlay}>
          <Animated.ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
          >
            <Animated.View
              style={[
                styles.header,
                {
                  opacity: headerOpacity,
                  transform: [{ translateY: headerTranslateY }],
                },
              ]}
            >
              <Text variant="headlineMedium" style={styles.headerTitle}>
                VCB Super App
              </Text>
              <Text variant="titleMedium" style={styles.headerSubtitle}>
                Choose an application
              </Text>
            </Animated.View>

            <View style={styles.tilesContainer}>
              {apps.map((app, index) => (
                <AppTile
                  key={index}
                  index={index}
                  title={app.title}
                  icon={app.icon}
                  color={app.color}
                  gradientColors={app.gradientColors}
                  onPress={app.onPress}
                />
              ))}
            </View>
          </Animated.ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 94, 32, 0.85)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: TILE_MARGIN,
    paddingTop: 10,
  },
  tileContainer: {
    margin: TILE_MARGIN,
    width: TILE_SIZE,
    height: TILE_SIZE,
  },
  tileWrapper: {
    flex: 1,
  },
  tileSurface: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tile: {
    flex: 1,
    borderRadius: 20,
  },
  tileContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  tileIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  tileTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});

export default NavigationHubScreen;
