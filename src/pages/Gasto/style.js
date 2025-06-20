import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
},
header: {
    backgroundColor: '#1967d2',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
},
headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
},
rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
},
leftColumn: {
    flex: 2,
    paddingRight: 10,
},
rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
},
gastoNome: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
},
gastoData: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
},
gastoValor: {
    fontSize: 16,
    fontWeight: 'bold',
},
typeAvista: {
    color: '#2ecc71', // Verde para à vista
},
typeAprazo: {
    color: '#e74c3c', // Vermelho para a prazo
},
deleteButton: {
    marginTop: 5,
},
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
loadingText: {
    fontSize: 16,
    color: '#666',
},
emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
},
emptyText: {
    fontSize: 16,
    color: '#888',
},
addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1967d2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
},
addButtonText: {
    fontSize: 28,
    color: '#fff',
    lineHeight: 30,
},
listContainer: {
    paddingBottom: 20,
}
});