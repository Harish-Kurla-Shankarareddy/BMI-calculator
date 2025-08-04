import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  Heart,
  Calculator,
  Target,
  TrendingUp,
  Activity,
  Utensils,
} from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();

  const features = [
    {
      icon: <Calculator size={24} color="#3B82F6" />,
      title: 'BMI Calculator',
      description: 'Get your Body Mass Index instantly',
    },
    {
      icon: <Target size={24} color="#10B981" />,
      title: 'Calorie Tracker',
      description: 'Find your daily calorie needs',
    },
    {
      icon: <Heart size={24} color="#EF4444" />,
      title: 'Health Tips',
      description: 'Personalized wellness advice',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Heart size={32} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.appName}>BMI & Calorie QuickCalc</Text>
          <Text style={styles.tagline}>Your personal health companion</Text>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome to your health journey! 👋</Text>
          <Text style={styles.welcomeText}>
            Get instant insights into your BMI, daily calorie needs, and receive personalized health tips to help you achieve your wellness goals.
          </Text>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What you'll get:</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  {feature.icon}
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Preview */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Quick Health Facts</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <TrendingUp size={20} color="#3B82F6" />
              <Text style={styles.statNumber}>18.5-24.9</Text>
              <Text style={styles.statLabel}>Normal BMI Range</Text>
            </View>
            <View style={styles.statCard}>
              <Activity size={20} color="#10B981" />
              <Text style={styles.statNumber}>150 min</Text>
              <Text style={styles.statLabel}>Weekly Exercise</Text>
            </View>
            <View style={styles.statCard}>
              <Utensils size={20} color="#F59E0B" />
              <Text style={styles.statNumber}>2000</Text>
              <Text style={styles.statLabel}>Average Calories</Text>
            </View>
          </View>
        </View>

        {/* CTA Button */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/calculator')}
            activeOpacity={0.8}
          >
            <Calculator size={24} color="#FFFFFF" />
            <Text style={styles.ctaButtonText}>Start Your Calculation</Text>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>
            Takes less than 30 seconds • No signup required
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 32,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  welcomeCard: {
    margin: 16,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    textAlign: 'center',
  },
  featuresSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsSection: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  ctaSection: {
    padding: 24,
    alignItems: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 12,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  ctaSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});