import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const sections = ["Overview", "Restaurants", "Menus", "Preview", "Publish"];

export default function App() {
  const [active, setActive] = useState("Overview");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>Digital Menu</Text>
        <Text style={styles.subtitle}>Owner Mobile Studio</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
        {sections.map((section) => (
          <TouchableOpacity key={section} onPress={() => setActive(section)} style={[styles.tab, active === section && styles.tabActive]}>
            <Text style={[styles.tabText, active === section && styles.tabTextActive]}>{section}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick actions</Text>
          <Text style={styles.cardBody}>Create menus, edit items, and publish instantly.</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Create restaurant</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Menu builder</Text>
          <Text style={styles.cardBody}>Reorder items and add add-ons.</Text>
          <TextInput placeholder="Search items" placeholderTextColor="#94a3b8" style={styles.input} />
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Preview & publish</Text>
          <Text style={styles.cardBody}>Preview themes and share QR codes.</Text>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Show QR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    padding: 20,
  },
  title: {
    color: "#f8fafc",
    fontSize: 24,
    fontWeight: "600",
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 4,
  },
  tabs: {
    paddingHorizontal: 16,
    maxHeight: 44,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    borderRadius: 999,
    backgroundColor: "#1e293b",
  },
  tabActive: {
    backgroundColor: "#4f46e5",
  },
  tabText: {
    color: "#cbd5f5",
    fontSize: 12,
  },
  tabTextActive: {
    color: "#fff",
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  cardBody: {
    color: "#94a3b8",
    marginTop: 6,
    marginBottom: 12,
  },
  input: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f8fafc",
  },
  primaryButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  secondaryButton: {
    borderColor: "#4b5563",
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#e2e8f0",
  },
});
