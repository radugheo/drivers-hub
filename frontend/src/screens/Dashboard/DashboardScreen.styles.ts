import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Adjust the padding as needed
  },
  sliderWidth: {
    width: width,
  },
  itemWidth: {
    width: width - 60, // Account for padding
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
  },
  carTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  documentContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  documentText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#e6e6e6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#0000ff', // Example button text color
  },
});
