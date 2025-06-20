import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1967d2',
        marginTop: 15,
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    dateInput: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 6,
        paddingHorizontal: 15,
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
    paymentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    paymentButton: {
        width: '48%',
        padding: 12,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    selectedPayment: {
        backgroundColor: '#1967d2',
        borderColor: '#1967d2',
    },
    paymentText: {
        color: '#333',
        fontWeight: '500',
    },
    selectedPaymentText: {
        color: '#fff',
        fontWeight: '500',
    },
    buttonSave: {
        backgroundColor: '#1967d2',
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonSaveText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});