
import React from 'react';


import ReactPDF, {
  Page,
  Document,
  Text,
  View,
  StyleSheet
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 10 },
  label: { fontSize: 12, fontWeight: 'bold' },
  value: { fontSize: 12 }
});


const TicketPDF = ({ ticket }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Flight Ticket</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Passenger Name:</Text>
        <Text style={styles.value}>{ticket.passengerName}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Flight Number:</Text>
        <Text style={styles.value}>{ticket.number}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>From</Text>
        <Text style={styles.value}>{ticket.from}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>To</Text>
        <Text style={styles.value}>{ticket.to}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Seat Number:</Text>
        <Text style={styles.value}>{ticket.seatNumber}</Text>
      </View>
       <View style={styles.section}>
        <Text style={styles.label}>Arrival:</Text>
        <Text style={styles.value}>{ticket.arrival}</Text>
      </View>
       <View style={styles.section}>
        <Text style={styles.label}>Departure:</Text>
        <Text style={styles.value}>{ticket.departure}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{ticket.date}</Text>
      </View>
    </Page>
  </Document>
);

export default TicketPDF;
