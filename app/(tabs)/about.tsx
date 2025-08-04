import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  Info,
  Calculator,
  Target,
  Heart,
  Utensils,
  Activity,
} from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Info size={32} color="#3B82F6" />
          <Text style={styles.title}>About BMI & Calorie QuickCalc</Text>
          <Text style={styles.subtitle}>Understanding your health metrics</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Calculator size={24} color="#10B981" />
              <Text style={styles.cardTitle}>BMI Calculation</Text>
            </View>
            <Text style={styles.cardText}>
              Body Mass Index (BMI) is calculated using the formula: weight (kg) ÷ height (m)².
              It's a screening tool to categorize weight status, but doesn't directly measure body fat.
            </Text>
            <View style={styles.bmiCategories}>
              <Text style={styles.categoryTitle}>BMI Categories:</Text>
              <View style={styles.categoryItem}>
                <View style={[styles.colorDot, { backgroundColor: '#3B82F6' }]} />
                <Text style={styles.categoryText}>Underweight: Below 18.5</Text>
              </View>
              <View style={styles.categoryItem}>
                <View style={[styles.colorDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.categoryText}>Normal: 18.5 - 24.9</Text>
              </View>
              <View style={styles.categoryItem}>
                <View style={[styles.colorDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.categoryText}>Overweight: 25 - 29.9</Text>
              </View>
              <View style={styles.categoryItem}>
                <View style={[styles.colorDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.categoryText}>Obese: 30 and above</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Target size={24} color="#F59E0B" />
              <Text style={styles.cardTitle}>Calorie Calculation</Text>
            </View>
            <Text style={styles.cardText}>
              Daily calorie needs are calculated using your Basal Metabolic Rate (BMR) multiplied by your activity level.
              We use the Mifflin-St Jeor equation for accurate BMR calculation.
            </Text>
            <View style={styles.activityLevels}>
              <Text style={styles.categoryTitle}>Activity Multipliers:</Text>
              <Text style={styles.activityText}>• Sedentary: Little to no exercise (×1.2)</Text>
              <Text style={styles.activityText}>• Light: Light exercise 1-3 days/week (×1.375)</Text>
              <Text style={styles.activityText}>• Moderate: Moderate exercise 3-5 days/week (×1.55)</Text>
              <Text style={styles.activityText}>• Very Active: Hard exercise 6-7 days/week (×1.725)</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Heart size={24} color="#EF4444" />
              <Text style={styles.cardTitle}>Health Tips</Text>
            </View>
            <Text style={styles.cardText}>
              Our personalized health tips are based on your BMI category and include:
            </Text>
            <View style={styles.tipTypes}>
              <View style={styles.tipTypeItem}>
                <Utensils size={16} color="#10B981" />
                <Text style={styles.tipTypeText}>Nutrition advice tailored to your needs</Text>
              </View>
              <View style={styles.tipTypeItem}>
                <Activity size={16} color="#3B82F6" />
                <Text style={styles.tipTypeText}>Exercise recommendations for your level</Text>
              </View>
              <View style={styles.tipTypeItem}>
                <Heart size={16} color="#EF4444" />
                <Text style={styles.tipTypeText}>Lifestyle tips for overall wellness</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Info size={24} color="#6B7280" />
              <Text style={styles.cardTitle}>Important Notes</Text>
            </View>
            <Text style={styles.cardText}>
              • This app provides general health information and should not replace professional medical advice{'\n\n'}
              • BMI may not accurately reflect health status for athletes, pregnant women, or elderly individuals{'\n\n'}
              • Calorie needs can vary based on genetics, medical conditions, and other factors{'\n\n'}
              • Always consult healthcare professionals for personalized medical advice
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              BMI & Calorie QuickCalc v1.0{'\n'}
              Made with ❤️ for your health journey
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 16,
  },
  bmiCategories: {
    marginTop: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#4B5563',
  },
  activityLevels: {
    marginTop: 8,
  },
  activityText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 4,
  },
  tipTypes: {
    marginTop: 12,
  },
  tipTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  tipTypeText: {
    fontSize: 16,
    color: '#4B5563',
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
  },
  footer: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});