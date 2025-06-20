import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./style";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseConfig } from "../../config/firebase.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Função para formatar valor monetário
const formatMoney = (value) => {
    if (!value && value !== 0) return '';
    
    // Remove qualquer formatação existente
    const rawValue = typeof value === 'string' 
        ? value.replace(/[^\d,-]/g, '').replace(',', '.') 
        : value;
    
    const number = parseFloat(rawValue);
    
    return isNaN(number) ? '' : number.toFixed(2).replace('.', ',');
};

// Função para converter valor formatado para número
const parseMoney = (formattedValue) => {
    if (!formattedValue) return null;
    const rawValue = formattedValue.replace(/[^\d,-]/g, '').replace(',', '.');
    return parseFloat(rawValue);
};

export default function Detalhes({ navigation, route }) {
    const initialData = route.params || {};
    
    const [descriptionEdit, setDescriptionEdit] = useState(initialData.descricao || '');
    const [valueEdit, setValueEdit] = useState(
        initialData.valor ? formatMoney(initialData.valor.toString()) : ''
    );
    const [dateEdit, setDateEdit] = useState(initialData.data ? initialData.data.toDate() : new Date());
    const [paymentTypeEdit, setPaymentTypeEdit] = useState(initialData.tipoPagamento || 'à vista');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const idTask = initialData.id;

    const handleValueChange = (text) => {
        // Permite apenas números e vírgula
        const cleanedText = text.replace(/[^\d,]/g, '');
        
        // Garante apenas uma vírgula
        const parts = cleanedText.split(',');
        if (parts.length > 2) return;
        
        // Limita a 2 casas decimais
        if (parts[1] && parts[1].length > 2) return;
        
        setValueEdit(cleanedText);
    };

    const editTask = () => {
        if (!idTask) {
            Alert.alert('Erro', 'ID do gasto não encontrado');
            return;
        }

        const updateData = {
            descricao: descriptionEdit,
            valor: parseMoney(valueEdit),
            data: dateEdit,
            tipoPagamento: paymentTypeEdit,
            status: true
        };

        updateDoc(doc(db, "Gasto", idTask), updateData)
            .then(() => {
                navigation.navigate("Gasto");
            })
            .catch(error => {
                Alert.alert('Erro', 'Não foi possível atualizar o gasto');
                console.error(error);
            });
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDateEdit(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Compras do mês"
                onChangeText={setDescriptionEdit}
                value={descriptionEdit}
            />

            <Text style={styles.label}>Valor (R$)</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 150,50"
                keyboardType="numeric"
                onChangeText={handleValueChange}
                value={valueEdit}
            />

            <Text style={styles.label}>Data</Text>
            <TouchableOpacity 
                onPress={() => setShowDatePicker(true)} 
                style={styles.dateInput}
            >
                <Text>{dateEdit.toLocaleDateString('pt-BR')}</Text>
            </TouchableOpacity>
            
            {showDatePicker && (
                <DateTimePicker
                    value={dateEdit}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}

            <Text style={styles.label}>Tipo de Pagamento</Text>
            <View style={styles.paymentContainer}>
                <TouchableOpacity 
                    style={[styles.paymentButton, paymentTypeEdit === 'à vista' && styles.selectedPayment]}
                    onPress={() => setPaymentTypeEdit('à vista')}
                >
                    <Text style={paymentTypeEdit === 'à vista' ? styles.selectedPaymentText : styles.paymentText}>
                        À Vista
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.paymentButton, paymentTypeEdit === 'a prazo' && styles.selectedPayment]}
                    onPress={() => setPaymentTypeEdit('a prazo')}
                >
                    <Text style={paymentTypeEdit === 'a prazo' ? styles.selectedPaymentText : styles.paymentText}>
                        A Prazo
                    </Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.buttonSave}
                onPress={editTask}
            >
                <Text style={styles.buttonSaveText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}