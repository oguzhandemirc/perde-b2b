import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background p-4">
      <Stack.Screen options={{ title: t('home.title') }} />
      <Heading size="2xl">{t('home.heading')}</Heading>
      <Text className="text-center text-muted-foreground">{t('home.subtitle')}</Text>
    </View>
  );
}
