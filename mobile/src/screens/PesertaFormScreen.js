import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import api from "../api/api";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function PesertaFormScreen({ route, navigation }) {
  const id = route.params?.id;

  const [form, setForm] = useState({
    nama: "",
    tempatlahir: "",
    tanggallahir: "",
    agama: "",
    alamat: "",
    telpon: "",
    jk: "",
    hobi: "",
    foto: "",
    id_kabko: "",
  });

  const [kabko, setKabko] = useState([]);
  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    getKabko();
    if (id) getPesertaById();
  }, [id]);

  const getKabko = async () => {
    try {
      const res = await api.get("/kabko");
      setKabko(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPesertaById = async () => {
    try {
      const res = await api.get(`/peserta/${id}`);
      setForm({
        ...res.data,
        id_kabko: res.data.id_kabko?.toString(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      handleChange("foto", result.assets[0].uri);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate) {
      const date = selectedDate.toISOString().split("T")[0];
      handleChange("tanggallahir", date);
    }
  };

  const simpanPeserta = async () => {
    try {
      const payload = {
        ...form,
        id_kabko: parseInt(form.id_kabko),
      };

      if (id) {
        await api.put(`/peserta/${id}`, payload);
      } else {
        await api.post("/peserta", payload);
      }

      Alert.alert("Sukses", "Data berhasil disimpan");
      navigation.goBack();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Gagal simpan");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nama"
        value={form.nama}
        onChangeText={(v) => handleChange("nama", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Tempat Lahir"
        value={form.tempatlahir}
        onChangeText={(v) => handleChange("tempatlahir", v)}
      />

      <TouchableOpacity onPress={() => setShowDate(true)} style={styles.input}>
        <Text>{form.tanggallahir || "Pilih Tanggal Lahir"}</Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={form.tanggallahir ? new Date(form.tanggallahir) : new Date()}
          mode="date"
          onChange={onChangeDate}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Agama"
        value={form.agama}
        onChangeText={(v) => handleChange("agama", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Alamat"
        value={form.alamat}
        onChangeText={(v) => handleChange("alamat", v)}
      />

      <TextInput
        style={styles.input}
        placeholder="Telpon"
        value={form.telpon}
        onChangeText={(v) => handleChange("telpon", v)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Jenis Kelamin</Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity
          style={[styles.jk, form.jk === "L" && styles.active]}
          onPress={() => handleChange("jk", "L")}
        >
          <Text>Laki-laki</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.jk, form.jk === "P" && styles.active]}
          onPress={() => handleChange("jk", "P")}
        >
          <Text>Perempuan</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Hobi"
        value={form.hobi}
        onChangeText={(v) => handleChange("hobi", v)}
      />

      <Text style={styles.label}>Pilih Kab/Kota</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={form.id_kabko}
          onValueChange={(v) => handleChange("id_kabko", v)}
        >
          <Picker.Item label="Pilih Kab/Kota" value="" />
          {Array.isArray(kabko) &&
            kabko.map((item) => (
              <Picker.Item
                key={item.id.toString()}
                label={item.nama}
                value={item.id.toString()}
              />
            ))}
        </Picker>
      </View>

      <Text style={styles.label}>Foto</Text>
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <Text style={{ color: "#fff" }}>Pilih Foto dari Galeri</Text>
      </TouchableOpacity>

      {form.foto ? (
        <Image
          source={{ uri: form.foto }}
          style={styles.previewFoto}
        />
      ) : null}

      <TouchableOpacity style={styles.saveButton} onPress={simpanPeserta}>
        <Text style={styles.saveButtonText}>
          {id ? "Update Data" : "Simpan Data"}
        </Text>
      </TouchableOpacity>
      
      {/* View tambahan untuk padding bawah agar tidak terpotong */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f9f9f9" },
  label: { fontWeight: "bold", marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  uploadButton: {
    backgroundColor: "#6366f1",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "green",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  jk: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "#4ade80",
    borderColor: "#22c55e",
  },
  previewFoto: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
});
