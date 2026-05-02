import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import api from "../api/api";

export default function PesertaDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [peserta, setPeserta] = useState(null);

  useEffect(() => {
    getDetailPeserta();
  }, []);

  const getDetailPeserta = async () => {
    try {
      const response = await api.get(`/peserta/${id}`);
      setPeserta(response.data);
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail peserta");
      console.log(error.message);
    }
  };

  if (!peserta) {
    return (
      <View style={styles.container}>
        <Text>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.nama}>{peserta.nama}</Text>

        <Text style={styles.label}>ID</Text>
        <Text style={styles.value}>{peserta.id}</Text>

        <Text style={styles.label}>Tempat Lahir</Text>
        <Text style={styles.value}>{peserta.tempatlahir}</Text>

        <Text style={styles.label}>Tanggal Lahir</Text>
        <Text style={styles.value}>{peserta.tanggallahir}</Text>

        <Text style={styles.label}>Alamat</Text>
        <Text style={styles.value}>{peserta.alamat}</Text>

        <Text style={styles.label}>Telepon</Text>
        <Text style={styles.value}>{peserta.telepon}</Text>

        <Text style={styles.label}>Jenis Kelamin</Text>
        <Text style={styles.value}>{peserta.jk}</Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate("PesertaForm", {
            id: peserta.id,
          })
        }
      >
        <Text style={styles.buttonText}>Edit Data</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 10,
    elevation: 3,
  },
  nama: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  value: {
    marginTop: 2,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#f59e0b",
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});