import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { collection, getDocs, deleteDoc, doc } from "@firebase/firestore";
import { firebaseConfig } from "../../config/firebase.js";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import styles from "./style.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const formatMoney = (value) => {
    if (!value && value !== 0) return 'Valor não informado';
    const number = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(number);
};

export default function Gasto({ navigation }) {
    const [gastos, setGastos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchGastos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Gasto"));
            const gastosData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                valor: doc.data().valor ? Number(doc.data().valor) : null
            }));
            setGastos(gastosData);
        } catch (error) {
            console.error("Erro ao carregar gastos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchGastos);
        return unsubscribe;
    }, [navigation]);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "Gasto", id));
            fetchGastos();
        } catch (error) {
            console.error("Erro ao excluir gasto:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Listagem de Gastos</Text>
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Carregando...</Text>
                </View>
            ) : (
                <FlatList
                    data={gastos}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.rowContainer}>
                            {/* Coluna da Esquerda - Descrição */}
                            <TouchableOpacity
                                style={styles.leftColumn}
                                onPress={() => navigation.navigate("Detalhes", {
                                    id: item.id,
                                    ...item
                                })}
                            >
                                <Text style={styles.gastoNome} numberOfLines={1}>{item.descricao}</Text>
                                <Text style={styles.gastoData}>
                                    {item.data?.toDate().toLocaleDateString('pt-BR')}
                                </Text>
                            </TouchableOpacity>
                            
                            {/* Coluna da Direita - Valor e Ações */}
                            <View style={styles.rightColumn}>
                                <Text style={[
                                    styles.gastoValor,
                                    item.tipoPagamento === 'à vista' ? styles.typeAvista : styles.typeAprazo
                                ]}>
                                    {formatMoney(item.valor)}
                                </Text>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <FontAwesome name="trash" size={20} color="#000000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>Nenhum gasto cadastrado</Text>
                        </View>
                    }
                />
            )}

            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate("NovoGasto")}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}