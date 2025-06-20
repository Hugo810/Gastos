import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { addDoc, collection } from "firebase/firestore"; 
import { firebaseConfig } from "../../config/firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Novogasto({ navigation }) {
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState(new Date());
    const [paymentType, setPaymentType] = useState('à vista');
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Formata o valor para exibição (R$ 1.234,56)
    const formatCurrencyDisplay = (value) => {
        if (!value) return '';
        
        // Remove todos os caracteres não numéricos
        const numericValue = value.replace(/\D/g, '');
        
        // Converte para número e formata
        const number = parseFloat(numericValue) / 100;
        
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    };

    // Manipula a mudança no campo de valor
    const handleValueChange = (text) => {
        // Formata o texto digitado para o padrão monetário
        const formattedValue = formatCurrencyDisplay(text);
        setValue(formattedValue);
    };

    // Converte o valor formatado para número antes de salvar
    const parseCurrencyToNumber = (formattedValue) => {
        if (!formattedValue) return 0;
        return parseFloat(
            formattedValue
                .replace('R$', '')
                .replace('.', '')
                .replace(',', '.')
                .trim()
        );
    };

    const handleAddTask = () => {
        if (!description.trim()) {
            Alert.alert('Atenção', 'Por favor, informe uma descrição para o gasto');
            return;
        }

        const numericValue = parseCurrencyToNumber(value);
        if (numericValue <= 0) {
            Alert.alert('Atenção', 'Por favor, informe um valor válido');
            return;
        }

        const taskData = {
            descricao: description.trim(),
            valor: numericValue,
            data: date,
            tipoPagamento: paymentType,
            status: true,
            createdAt: new Date()
        };

        addDoc(collection(db, "Gasto"), taskData)
            .then(() => {
                navigation.navigate("Gasto");
            })
            .catch(error => {
                console.error("Erro ao adicionar gasto: ", error);
                Alert.alert('Erro', 'Não foi possível salvar o gasto');
            });
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Descrição*</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Compras do mês"
                onChangeText={setDescription}
                value={description}
                maxLength={100}
            />

            <Text style={styles.label}>Valor*</Text>
            <TextInput
                style={styles.input}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                onChangeText={handleValueChange}
                value={value}
            />

            <Text style={styles.label}>Data*</Text>
            <TouchableOpacity 
                onPress={() => setShowDatePicker(true)} 
                style={styles.dateInput}
            >
                <Text>{date.toLocaleDateString('pt-BR')}</Text>
            </TouchableOpacity>
            
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                    maximumDate={new Date()}
                />
            )}

            <Text style={styles.label}>Tipo de Pagamento*</Text>
            <View style={styles.paymentContainer}>
                <TouchableOpacity 
                    style={[styles.paymentButton, paymentType === 'à vista' && styles.selectedPayment]}
                    onPress={() => setPaymentType('à vista')}
                >
                    <Text style={paymentType === 'à vista' ? styles.selectedPaymentText : styles.paymentText}>
                        À Vista
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.paymentButton, paymentType === 'a prazo' && styles.selectedPayment]}
                    onPress={() => setPaymentType('a prazo')}
                >
                    <Text style={paymentType === 'a prazo' ? styles.selectedPaymentText : styles.paymentText}>
                        A Prazo
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity 
                style={styles.buttonSave}
                onPress={handleAddTask}
            >
                <Text style={styles.buttonSaveText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}