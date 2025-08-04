import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
} from 'react-native';
import {
  Weight,
  Ruler,
  User,
  Calendar,
  Activity,
  Calculator,
  ArrowLeft,
  Heart,
  Target,
  Utensils,
  Moon,
} from 'lucide-react-native';

interface BMIResult {
  value: number;
  category: string;
  color: string;
  message: string;
}

interface CalorieResult {
  min: number;
  max: number;
  bmr: number;
}

interface HealthTip {
  icon: React.ReactNode;
  text: string;
}

export default function CalculatorScreen() {
  // Input states
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'very'>('moderate');
  
  // Unit toggles
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  
  // Screen state
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<{
    bmi: BMIResult | null;
    calories: CalorieResult | null;
    tips: HealthTip[];
  }>({ bmi: null, calories: null, tips: [] });

  // Animation
  const fadeAnim = new Animated.Value(1);

  // Utility functions
  const convertToKg = (weight: number, unit: 'kg' | 'lbs'): number => {
    return unit === 'lbs' ? weight * 0.453592 : weight;
  };

  const convertToCm = (height: number, feet: number, unit: 'cm' | 'ft'): number => {
    if (unit === 'ft') {
      return (feet * 12 + height) * 2.54;
    }
    return height;
  };

  const calculateBMI = (weightKg: number, heightCm: number): BMIResult => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    
    let category: string;
    let color: string;
    let message: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#3B82F6';
      message = 'Consider consulting a healthcare provider about healthy weight gain strategies.';
    } else if (bmi < 25) {
      category = 'Normal Weight';
      color = '#10B981';
      message = "You're in a healthy weight range! Keep up the good work.";
    } else if (bmi < 30) {
      category = 'Overweight';
      color = '#F59E0B';
      message = 'Consider adopting healthier eating habits and increasing physical activity.';
    } else {
      category = 'Obese';
      color = '#EF4444';
      message = 'Consult with a healthcare provider for personalized weight management advice.';
    }

    return { value: Math.round(bmi * 10) / 10, category, color, message };
  };

  const calculateCalories = (weightKg: number, heightCm: number, age: number, gender: 'male' | 'female', activity: string): CalorieResult => {
    // BMR calculation using Mifflin-St Jeor equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    // Activity multipliers
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
    };

    const tdee = bmr * multipliers[activity as keyof typeof multipliers];
    
    return {
      min: Math.round(tdee - 200),
      max: Math.round(tdee + 200),
      bmr: Math.round(bmr),
    };
  };

  const getHealthTips = (bmiCategory: string): HealthTip[] => {
    const tips = {
      'Underweight': [
        { icon: <Utensils size={20} color="#3B82F6" />, text: 'Add healthy fats like nuts and avocados to your diet' },
        { icon: <Target size={20} color="#3B82F6" />, text: 'Focus on strength training to build muscle mass' },
        { icon: <Moon size={20} color="#3B82F6" />, text: 'Ensure adequate sleep for muscle recovery' },
      ],
      'Normal Weight': [
        { icon: <Utensils size={20} color="#10B981" />, text: 'Fill half your plate with vegetables and fruits' },
        { icon: <Activity size={20} color="#10B981" />, text: 'Aim for 150 minutes of moderate exercise weekly' },
        { icon: <Moon size={20} color="#10B981" />, text: 'Get 7-9 hours of quality sleep each night' },
      ],
      'Overweight': [
        { icon: <Utensils size={20} color="#F59E0B" />, text: 'Reduce portion sizes and limit processed foods' },
        { icon: <Activity size={20} color="#F59E0B" />, text: 'Start with 30 minutes of daily walking' },
        { icon: <Heart size={20} color="#F59E0B" />, text: 'Stay hydrated with 8 glasses of water daily' },
      ],
      'Obese': [
        { icon: <Utensils size={20} color="#EF4444" />, text: 'Focus on whole foods and lean proteins' },
        { icon: <Activity size={20} color="#EF4444" />, text: 'Begin with low-impact activities like swimming' },
        { icon: <Heart size={20} color="#EF4444" />, text: 'Monitor progress and celebrate small wins' },
      ],
    };

    return tips[bmiCategory as keyof typeof tips] || tips['Normal Weight'];
  };

  const validateInputs = (): boolean => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const heightFeetNum = parseFloat(heightFeet) || 0;
    const heightInchesNum = parseFloat(heightInches) || 0;
    const ageNum = parseFloat(age);

    if (!weightNum || weightNum <= 0) return false;
    if (heightUnit === 'cm' && (!heightNum || heightNum <= 0)) return false;
    if (heightUnit === 'ft' && (!heightFeetNum || heightFeetNum <= 0)) return false;
    if (!ageNum || ageNum <= 0 || ageNum > 120) return false;

    return true;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const heightFeetNum = parseFloat(heightFeet) || 0;
    const heightInchesNum = parseFloat(heightInches) || 0;
    const ageNum = parseFloat(age);

    const weightKg = convertToKg(weightNum, weightUnit);
    const heightCm = convertToCm(
      heightUnit === 'ft' ? heightInchesNum : heightNum,
      heightFeetNum,
      heightUnit
    );

    const bmi = calculateBMI(weightKg, heightCm);
    const calories = calculateCalories(weightKg, heightCm, ageNum, gender, activityLevel);
    const tips = getHealthTips(bmi.category);

    setResults({ bmi, calories, tips });

    // Animate transition
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowResults(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleBack = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setShowResults(false);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const UnitToggle = ({ 
    options, 
    selected, 
    onSelect 
  }: { 
    options: [string, string]; 
    selected: string; 
    onSelect: (option: any) => void;
  }) => (
    <View style={styles.unitToggle}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.unitOption,
            selected === option && styles.unitOptionActive,
          ]}
          onPress={() => onSelect(option)}
        >
          <Text style={[
            styles.unitOptionText,
            selected === option && styles.unitOptionTextActive,
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  if (showResults && results.bmi && results.calories) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.resultsHeader}>
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <ArrowLeft size={24} color="#6B7280" />
              </TouchableOpacity>
              <Text style={styles.resultsTitle}>Your Health Results</Text>
              <View style={styles.placeholder} />
            </View>

            {/* BMI Result */}
            <View style={[styles.resultCard, styles.bmiCard]}>
              <View style={styles.bmiHeader}>
                <Heart size={32} color={results.bmi.color} />
                <Text style={styles.cardTitle}>BMI Result</Text>
              </View>
              <Text style={[styles.bmiValue, { color: results.bmi.color }]}>
                {results.bmi.value}
              </Text>
              <Text style={[styles.bmiCategory, { color: results.bmi.color }]}>
                {results.bmi.category}
              </Text>
              <Text style={styles.bmiMessage}>{results.bmi.message}</Text>
            </View>

            {/* Calorie Result */}
            <View style={styles.resultCard}>
              <View style={styles.calorieHeader}>
                <Target size={32} color="#3B82F6" />
                <Text style={styles.cardTitle}>Daily Calories</Text>
              </View>
              <Text style={styles.calorieRange}>
                {results.calories.min.toLocaleString()} - {results.calories.max.toLocaleString()}
              </Text>
              <Text style={styles.calorieSubtext}>
                Based on BMR: {results.calories.bmr.toLocaleString()} calories
              </Text>
            </View>

            {/* Health Tips */}
            <View style={styles.resultCard}>
              <Text style={styles.cardTitle}>Personalized Health Tips</Text>
              <View style={styles.tipsContainer}>
                {results.tips.map((tip, index) => (
                  <View key={index} style={styles.tipCard}>
                    <View style={styles.tipIcon}>
                      {tip.icon}
                    </View>
                    <Text style={styles.tipText}>{tip.text}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Recalculate Button */}
            <View style={styles.recalculateSection}>
              <TouchableOpacity style={styles.recalculateButton} onPress={handleBack}>
                <Calculator size={20} color="#3B82F6" />
                <Text style={styles.recalculateButtonText}>Recalculate</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.animatedContainer, { opacity: fadeAnim }]}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Calculator size={32} color="#3B82F6" />
            <Text style={styles.title}>Health Calculator</Text>
            <Text style={styles.subtitle}>Enter your information below</Text>
          </View>

          <View style={styles.formSection}>
            {/* Weight Input */}
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <View style={styles.inputLabel}>
                  <Weight size={20} color="#374151" />
                  <Text style={styles.inputLabelText}>Weight</Text>
                </View>
                <UnitToggle
                  options={['kg', 'lbs']}
                  selected={weightUnit}
                  onSelect={setWeightUnit}
                />
              </View>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder={`Enter your weight in ${weightUnit}`}
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Height Input */}
            <View style={styles.inputCard}>
              <View style={styles.inputHeader}>
                <View style={styles.inputLabel}>
                  <Ruler size={20} color="#374151" />
                  <Text style={styles.inputLabelText}>Height</Text>
                </View>
                <UnitToggle
                  options={['cm', 'ft']}
                  selected={heightUnit}
                  onSelect={setHeightUnit}
                />
              </View>
              {heightUnit === 'cm' ? (
                <TextInput
                  style={styles.input}
                  value={height}
                  onChangeText={setHeight}
                  placeholder="Enter your height in cm"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                />
              ) : (
                <View style={styles.heightRow}>
                  <TextInput
                    style={[styles.input, styles.heightInput]}
                    value={heightFeet}
                    onChangeText={setHeightFeet}
                    placeholder="Feet"
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                  <TextInput
                    style={[styles.input, styles.heightInput]}
                    value={heightInches}
                    onChangeText={setHeightInches}
                    placeholder="Inches"
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              )}
            </View>

            {/* Age Input */}
            <View style={styles.inputCard}>
              <View style={styles.inputLabel}>
                <Calendar size={20} color="#374151" />
                <Text style={styles.inputLabelText}>Age</Text>
              </View>
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Enter your age"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
              />
            </View>

            {/* Gender Selection */}
            <View style={styles.inputCard}>
              <View style={styles.inputLabel}>
                <User size={20} color="#374151" />
                <Text style={styles.inputLabelText}>Gender</Text>
              </View>
              <View style={styles.genderToggle}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === 'male' && styles.genderOptionActive,
                  ]}
                  onPress={() => setGender('male')}
                >
                  <Text style={[
                    styles.genderOptionText,
                    gender === 'male' && styles.genderOptionTextActive,
                  ]}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    gender === 'female' && styles.genderOptionActive,
                  ]}
                  onPress={() => setGender('female')}
                >
                  <Text style={[
                    styles.genderOptionText,
                    gender === 'female' && styles.genderOptionTextActive,
                  ]}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Activity Level */}
            <View style={styles.inputCard}>
              <View style={styles.inputLabel}>
                <Activity size={20} color="#374151" />
                <Text style={styles.inputLabelText}>Activity Level</Text>
              </View>
              <View style={styles.activityGrid}>
                {[
                  { key: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise' },
                  { key: 'light', label: 'Light', desc: 'Light exercise 1-3 days/week' },
                  { key: 'moderate', label: 'Moderate', desc: 'Moderate exercise 3-5 days/week' },
                  { key: 'very', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.key}
                    style={[
                      styles.activityOption,
                      activityLevel === item.key && styles.activityOptionActive,
                    ]}
                    onPress={() => setActivityLevel(item.key as any)}
                  >
                    <Text style={[
                      styles.activityOptionText,
                      activityLevel === item.key && styles.activityOptionTextActive,
                    ]}>
                      {item.label}
                    </Text>
                    <Text style={[
                      styles.activityOptionDesc,
                      activityLevel === item.key && styles.activityOptionDescActive,
                    ]}>
                      {item.desc}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Calculate Button */}
          <View style={styles.calculateSection}>
            <TouchableOpacity
              style={[
                styles.calculateButton,
                !validateInputs() && styles.calculateButtonDisabled,
              ]}
              onPress={handleCalculate}
              disabled={!validateInputs()}
              activeOpacity={0.8}
            >
              <Calculator size={24} color="#FFFFFF" />
              <Text style={styles.calculateButtonText}>Calculate My Results</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  animatedContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 12,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  formSection: {
    padding: 16,
  },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  inputLabelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#1F2937',
  },
  heightRow: {
    flexDirection: 'row',
    gap: 12,
  },
  heightInput: {
    flex: 1,
  },
  unitToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 2,
  },
  unitOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  unitOptionActive: {
    backgroundColor: '#3B82F6',
  },
  unitOptionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  unitOptionTextActive: {
    color: '#FFFFFF',
  },
  genderToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  genderOptionActive: {
    backgroundColor: '#3B82F6',
  },
  genderOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  genderOptionTextActive: {
    color: '#FFFFFF',
  },
  activityGrid: {
    gap: 8,
  },
  activityOption: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activityOptionActive: {
    backgroundColor: '#EBF4FF',
    borderColor: '#3B82F6',
  },
  activityOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  activityOptionTextActive: {
    color: '#3B82F6',
  },
  activityOptionDesc: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  activityOptionDescActive: {
    color: '#6B7280',
  },
  calculateSection: {
    padding: 24,
  },
  calculateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 18,
    borderRadius: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  calculateButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  // Results Screen Styles
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  placeholder: {
    width: 40,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  bmiCard: {
    borderLeftWidth: 6,
    borderLeftColor: '#3B82F6',
  },
  bmiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  calorieHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 12,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 12,
  },
  bmiCategory: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  bmiMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  calorieRange: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B82F6',
    textAlign: 'center',
    marginVertical: 12,
  },
  calorieSubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  tipsContainer: {
    marginTop: 16,
    gap: 12,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  recalculateSection: {
    padding: 24,
    alignItems: 'center',
  },
  recalculateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recalculateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
    marginLeft: 8,
  },
});