import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import api from "../api/api";

export default function PesertaFormScreen({ route, navigation }) {
  const id = route.params?.id;

  const [form, setForm] = useState({
    nama: "",
    tempatlahir: "",
    tanggallahir: "",
    alamat: "",
    telepon: "",
    jk: "",
  });

  useEffect(() => {
    if (id) {
      getPesertaById();
    }
  }, [id]);

  const getPesertaById = async () => {
    try {
      const response = await api.get(`/peserta/${id}`);

      setForm({
        nama: response.data.nama || "",
        tempatlahir: response.data.tempatlahir || "",
        tanggallahir: response.data.tanggallahir || "",
        alamat: response.data.alamat || "",
        telepon: response.data.telepon || "",
        jk: response.data.jk || "",
      });
    } catch (error) {
      Alert.alert("Error", "Gagal mengambil detail peserta");
      console.log(error.message);
    }
  };

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const simpanPeserta = async () => {
    if (!form.nama || !form.tempatlahir || !form.tanggallahir) {
      Alert.alert("Validasi", "Nama, tempat lahir, dan tanggal lahir wajib diisi");
      return;
    }

    try {
      if (id) {
        await api.put(`/peserta/${id}`, form);
        Alert.alert("Sukses", "Data berhasil diperbarui");
      } else {
        await api.post("/peserta", form);
        Alert.alert("Sukses", "Data berhasil ditambahkan");
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Gagal menyimpan data peserta");
      console.log(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={form.nama}
        onChangeText={(value) => handleChange("nama", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tempat Lahir"
        value={form.tempatlahir}
        onChangeText={(value) => handleChange("tempatlahir", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tanggal Lahir, contoh: 2001-12-25"
        value={form.tanggallahir}
        onChangeText={(value) => handleChange("tanggallahir", value)}
      />

      <TextInput
        style={styles.input}
        placeholder="Alamat"
        value={form.alamat}
        onChangeText={(value) => handleChange("alamat", value)}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Telepon"
        value={form.telepon}
        onChangeText={(value) => handleChange("telepon", value)}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Jenis Kelamin, contoh: L atau P"
        value={form.jk}
        onChangeText={(value) => handleChange("jk", value)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={simpanPeserta}>
        <Text style={styles.saveButtonText}>
          {id ? "Update Peserta" : "Simpan Peserta"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 30,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});