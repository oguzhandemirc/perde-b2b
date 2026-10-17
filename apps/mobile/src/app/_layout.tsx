import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, type Theme } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/i18n';
import { queryClient } from '@/queries/queryClient';
import '@/global.css';

void SplashScreen.preventAutoHideAsync();

// Headers and tab bars render outside NativeWind, so they get Inter via the navigation theme.
const NAVIGATION_FONTS: Theme['fonts'] = {
  regular: { fontFamily: 'Inter_400Regular', fontWeight: '400' },
  medium: { fontFamily: 'Inter_500Medium', fontWeight: '500' },
  bold: { fontFamily: 'Inter_600SemiBold', fontWeight: '600' },
  heavy: { fontFamily: 'Inter_700Bold', fontWeight: '700' },
};
const LIGHT_NAVIGATION_THEME: Theme = { ...DefaultTheme, fonts: NAVIGATION_FONTS };
const DARK_NAVIGATION_THEME: Theme = { ...DarkTheme, fonts: NAVIGATION_FONTS };

export default function RootLayout() {
  const colorScheme = useColorScheme();
  // Family names must match the --font-inter-face values in global.css.
  const [hasLoadedFonts, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const isReady = hasLoadedFonts || fontError !== null;

  useEffect(() => {
    if (isReady) {
      void SplashScreen.hideAsync();
    }
  }, [isReady]);

  useEffect(() => {
    // Dev only: a silent fallback to the system font once hid a broken asset pipeline.
    // console.warn (not console.log) surfaces the cause in LogBox; production stays silent.
    if (__DEV__ && fontError) {
      console.warn(`Inter fonts failed to load; using the system font. ${fontError.message}`);
    }
  }, [fontError]);

  // On font error the app still opens with the system font instead of hanging on splash.
  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider mode="system">
        {/* Navigation chrome (headers, tab bar) follows the OS scheme like the CSS tokens. */}
        <ThemeProvider
          value={colorScheme === 'dark' ? DARK_NAVIGATION_THEME : LIGHT_NAVIGATION_THEME}
        >
          <Stack />
        </ThemeProvider>
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
