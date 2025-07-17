import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { allFlights as basicFlights } from './flightsData';
import { allFlights as mainFlights } from './flightsData200';
import { allFlights as extraFlights } from './flightsData_extraCountries';
import { allFlights as allFlightsData } from './flightsData_all'; // ✅ renamed

// ✅ Combine all into one
const allFlights = [
  ...basicFlights,
  ...mainFlights,
  ...extraFlights,
  ...allFlightsData, // ✅ use new name here
];



export default function FlightSearchScreen() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const fromInput = origin.trim().toLowerCase();
    const toInput = destination.trim().toLowerCase();

    const filtered = allFlights.filter((flight) => {
      const from = flight.from.toLowerCase();
      const to = flight.to.toLowerCase();

      // Match both directions
      return (
        (from.includes(fromInput) && to.includes(toInput)) ||
        (from.includes(toInput) && to.includes(fromInput))
      );
    });

    setResults(filtered.slice(0, 10)); // Limit to 10 results
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>✈️ Search Flights</Text>

      {/* Labels */}
      <View style={styles.row}>
        <Text style={styles.label}>From</Text>
        <Text style={styles.label}>To</Text>
        <Text style={styles.label}>Departure</Text>
        <Text style={styles.label}>Return</Text>
      </View>

      {/* Inputs */}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="e.g. from"
          value={origin}
          onChangeText={setOrigin}
        />
        <TextInput
          style={styles.input}
          placeholder="e.g. to"
          value={destination}
          onChangeText={setDestination}
        />
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={departure}
          onChangeText={setDeparture}
        />
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={returnDate}
          onChangeText={setReturnDate}
        />
      </View>

      {/* Search Button */}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {/* Results Table */}
      {results.length > 0 ? (
        <>
          <Text style={styles.resultsHeading}>Best Deals</Text>

          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>From</Text>
            <Text style={styles.tableHeader}>To</Text>
            <Text style={styles.tableHeader}>Departure</Text>
            <Text style={styles.tableHeader}>Arrival</Text>
            <Text style={styles.tableHeader}>Duration</Text>
            <Text style={styles.tableHeader}>Price</Text>
          </View>

          {results.map((flight, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{flight.from}</Text>
              <Text style={styles.tableCell}>{flight.to}</Text>
              <Text style={styles.tableCell}>
                {new Date(flight.departureTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Text style={styles.tableCell}>
                {new Date(flight.arrivalTime).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
              <Text style={styles.tableCell}>{flight.duration}</Text>
              <Text style={styles.tableCell}>{flight.price}</Text>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.noResult}>No flights found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 23,
    width: '24%',
    textAlign: 'center',
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 17,
    fontSize: 18,
    width: '24%',
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  resultsHeading: {
    marginTop: 35,
    fontSize: 29,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 22,
    width: '16.5%',
    textAlign: 'center',
    color: '#007BFF',
  },
  tableCell: {
    fontSize: 17,
    width: '16.5%',
    textAlign: 'center',
    color: '#000',
  },
  noResult: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
    fontSize: 18,
  },
});
