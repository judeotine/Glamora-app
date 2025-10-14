import { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import { colors, spacing, borderRadius, shadows } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const mockEvents = [
  {
    id: '1',
    title: 'Diamond Collection Launch',
    description: 'Exclusive preview of our new diamond collection',
    date: 'Feb 15, 2024',
    time: '7:00 PM EST',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    isLive: true,
    rsvp: 245,
    isRegistered: false,
  },
  {
    id: '2',
    title: 'AI Design Workshop',
    description: 'Learn advanced tips for AI jewelry design',
    date: 'Feb 20, 2024',
    time: '6:00 PM EST',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    isLive: false,
    rsvp: 128,
    isRegistered: true,
  },
  {
    id: '3',
    title: 'Spring Collection Preview',
    description: 'First look at our spring jewelry line',
    date: 'Mar 1, 2024',
    time: '5:00 PM EST',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600',
    isLive: false,
    rsvp: 89,
    isRegistered: false,
  },
];

export const LiveEventsScreen = () => {
  const [events, setEvents] = useState(mockEvents);
  const { mode } = useTheme();
  const isDark = mode === 'dark';

  const toggleRSVP = (id: string) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === id
          ? {
              ...e,
              isRegistered: !e.isRegistered,
              rsvp: e.isRegistered ? e.rsvp - 1 : e.rsvp + 1,
            }
          : e
      )
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight,
        },
      ]}
      edges={['top']}
    >
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text variant="h5">Live Events</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {events.map(event => (
            <Card key={event.id} style={styles.eventCard}>
              <View style={styles.eventImageContainer}>
                <Image
                  source={{ uri: event.image }}
                  style={styles.eventImage}
                  resizeMode="cover"
                />
                {event.isLive && (
                  <View style={styles.liveBadge}>
                    <View style={styles.liveDot} />
                    <Text variant="caption" style={styles.liveText}>
                      LIVE
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.eventContent}>
                <Text variant="h6" style={styles.eventTitle}>
                  {event.title}
                </Text>
                <Text
                  variant="body"
                  color={isDark ? colors.textDark.secondary : colors.text.secondary}
                  style={styles.eventDescription}
                >
                  {event.description}
                </Text>

                <View style={styles.eventMeta}>
                  <View style={styles.metaItem}>
                    <Icon
                      name="calendar-outline"
                      size={16}
                      color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                    />
                    <Text
                      variant="caption"
                      color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                    >
                      {event.date}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon
                      name="time-outline"
                      size={16}
                      color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                    />
                    <Text
                      variant="caption"
                      color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                    >
                      {event.time}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Icon
                      name="people-outline"
                      size={16}
                      color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                    />
                    <Text
                      variant="caption"
                      color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                    >
                      {event.rsvp} attending
                    </Text>
                  </View>
                </View>

                <Button
                  title={event.isRegistered ? 'Cancel RSVP' : 'RSVP Now'}
                  onPress={() => toggleRSVP(event.id)}
                  variant={event.isRegistered ? 'outline' : 'primary'}
                  fullWidth
                  size="sm"
                />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    padding: spacing.lg,
  },
  eventCard: {
    marginBottom: spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  eventImageContainer: {
    position: 'relative',
    height: 200,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  liveBadge: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.inverse,
  },
  liveText: {
    color: colors.text.inverse,
    fontWeight: '700',
  },
  eventContent: {
    padding: spacing.md,
  },
  eventTitle: {
    marginBottom: spacing.sm,
  },
  eventDescription: {
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  eventMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});

