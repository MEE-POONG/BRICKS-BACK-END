import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import React from "react";


const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
    
      // Head
      header: {
        fontSize: 16,
        // textAlign: 'center'
      },
      title: {
        fontSize: 28,
        textAlign: "right",
      },
      subtitle: {
        fontSize: 12,
        marginTop: 7,
        marginBottom: 20,
      },
    
      detail: {
        fontSize: 12,
        marginTop: 7,
      },
      ordercode: {
        fontSize: 13,
      },
    
      table1: {
        display: "table",
        marginTop: 15,
        borderRightWidth: 0,
        borderBottomWidth: 0,
      },
      tCol1: {
        width: "65%",
      },
      tCol2: {
        width: "35%",
      },
    
      // TableList
      table: {
        display: "table",
        width: "100%",
        marginTop: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
      },
      tableRow: {
        margin: "auto",
        flexDirection: "row",
      },
      tableCol: {
        width: "10%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol2: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCol3: {
        width: "65%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
      },
      tableCell: {
        margin: 6,
        textAlign: "center",
        fontSize: 12,
      },
      tableCell1: {
        margin: 5,
        fontSize: 12,
        textAlign: "left",
      },
      tableCell2: {
        margin: 5,
        fontSize: 12,
        textAlign: "right",
      },
      tableFLeft: {
        width: "75%",
        textAlign: "right",
      },
      tableFRight: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
      },
    
      // Foot
      box:{
        width: "50%",
        textAlign: "center",
        marginTop:20
      },
      sender:{
        fontSize: 12,
      },
})

export default function MyQuotation () {
    return (
        <Document>
            <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          Dream Block
        </Text>

        {/* Head */}
        <Text style={styles.subtitle}>
          Address Tha Ang, Chok Chai District, Nakhon Ratchasima 30190
        </Text>
        <Text style={styles.title}>Quotation</Text>

        <View style={styles.table1}>
          <View style={styles.tableRow}>
            <View style={styles.tCol1}>
              <Text style={styles.userbox}>Receive</Text>
              <Text style={styles.detail}>Name :</Text>
              <Text style={styles.detail}>Address :</Text>
              <Text style={styles.detail}>Tel : </Text>
            </View>
            <View style={styles.tCol2}>
              <Text style={styles.detail}>No. </Text>
              <Text style={styles.detail}>DATE : </Text>
            </View>
          </View>
        </View>

        {/* Table list */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>No.</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell}>Product</Text>
            </View>

            <View style={styles.tableCol2}>
              <Text style={styles.tableCell}>Peice</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>1</Text>
            </View>
            <View style={styles.tableCol3}>
              <Text style={styles.tableCell1}>3 User </Text>
            </View>

            <View style={styles.tableCol2}>
              <Text style={styles.tableCell2}>5000.00</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableFLeft}>
              <Text style={styles.tableCell}>Totla</Text>
            </View>

            <View style={styles.tableFRight}>
              <Text style={styles.tableCell2}>5000.00</Text>
            </View>
          </View>
        </View>

        {/* Foot */}
        <View style={styles.tableRow}>
          <View style={styles.box}>
            <Text>.................................</Text>
            <Text style={styles.sender}>Sender</Text>
            <Text style={styles.sender}>datr......................</Text>
          </View>
          <View style={styles.box}>
            <Text>.................................</Text>
            <Text style={styles.sender}>Receive</Text>
            <Text style={styles.sender}>date......................</Text>
          </View>
        </View>
      </Page>
        </Document>
    )

}
