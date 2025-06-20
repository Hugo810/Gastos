import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    label: {
        width: "100%",
        marginTop: 20,
        fontSize: 16,
        color: "#1967d2",
        fontWeight: 'bold'
    },
    input: {
        width: "100%",
        marginTop: 10,
        padding: 15,
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#1967d2",
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        marginBottom: 10
    },
    buttonNewTask: {
        width: "100%",
        height: 50,
        marginTop: 30,
        backgroundColor: "#1967d2",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    iconButton: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
    },
    paymentButton: {
        width: "45%",
        padding: 15,
        borderWidth: 1,
        borderColor: "#1967d2",
        borderRadius: 5,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedPayment: {
        backgroundColor: "#e3f2fd",
        borderColor: "#1967d2",
    },
   dateInput: {
    width: "100%",
    marginTop: 10,
    padding: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#1967d2",
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom: 10
},
paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20
},
paymentButton: {
    width: '48%',
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center'
},
selectedPayment: {
    backgroundColor: '#1967d2',
    borderColor: '#1967d2'
},
paymentText: {
    color: '#333'
},
selectedPaymentText: {
    color: '#fff',
    fontWeight: 'bold'
},
buttonSave: {
    backgroundColor: '#1967d2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20
},
buttonSaveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
}
});

export default styles