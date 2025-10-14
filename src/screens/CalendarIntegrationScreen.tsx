import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/atoms/Button';
import { Card } from '@/components/molecules/Card';
import { Badge } from '@/components/atoms/Badge';
import { colors, spacing } from '@/theme';
import { useTheme } from '@/theme/ThemeProvider';

const upcomingAppointments = [
  {
    id: '1',
    title: 'Design Consultation',
    designer: 'Anya Peterson',
    date: 'Feb 15, 2024',
    time: '2:00 PM',
    type: 'video',
  },
  {
    id: '2',
    title: 'Custom Ring Fitting',
    designer: 'Leo Martinez',
    date: 'Feb 18, 2024',
    time: '11:00 AM',
    type: 'in-person',
  },
];

export const CalendarIntegrationScreen = () => {
  const { mode } = useTheme();
  const isDark = mode === 'dark';

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
        <Text variant="h5">Appointments</Text>
        <TouchableOpacity>
          <Icon name="add-circle-outline" size={28} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant="h6" style={styles.sectionTitle}>
            Upcoming
          </Text>

          {upcomingAppointments.map(apt => (
            <Card key={apt.id} style={styles.appointmentCard}>
              <View style={styles.appointmentHeader}>
                <View style={styles.appointmentInfo}>
                  <Text variant="body" style={styles.appointmentTitle}>
                    {apt.title}
                  </Text>
                  <Text
                    variant="caption"
                    color={isDark ? colors.textDark.tertiary : colors.text.tertiary}
                  >
                    with {apt.designer}
                  </Text>
                </View>
                <Badge
                  label={apt.type === 'video' ? 'VIDEO' : 'IN-PERSON'}
                  variant={apt.type === 'video' ? 'info' : 'success'}
                />
              </View>

              <View style={styles.appointmentMeta}>
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
                    {apt.date}
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
                    {apt.time}
                  </Text>
                </View>
              </View>

              <View style={styles.appointmentActions}>
                <Button title="Join" onPress={() => {}} size="sm" style={styles.actionButton} />
                <Button
                  title="Reschedule"
                  onPress={() => {}}
                  variant="outline"
                  size="sm"
                  style={styles.actionButton}
                />
              </View>
            </Card>
          ))}

          <Button
            title="Schedule New Appointment"
            onPress={() => {}}
            fullWidth
            style={styles.scheduleButton}
          />
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
  sectionTitle: {
    marginBottom: spacing.md,
  },
  appointmentCard: {
    marginBottom: spacing.md,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontWeight: '700',
    marginBottom: spacing.xs / 2,
  },
  appointmentMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  appointmentActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  scheduleButton: {
    marginTop: spacing.md,
  },
});

