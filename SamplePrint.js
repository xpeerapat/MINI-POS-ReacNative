import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer';
import { menu } from './dummy-logo';

const SamplePrint = ({ order }) => {

  const [no, setNo] = useState('')

  useEffect(() => {
    // on mount
    order.current.capture().then(uri => {
      setNo(uri)
    });
  }, []);

  return (
    <View>
      <Text>Sample Print Instruction</Text>

      <View style={styles.btn}>
        <Button
          title="Print Receipt"
          onPress={async () => {
            try {
              // await BluetoothEscposPrinter.printerInit();
              await BluetoothEscposPrinter.printPic(no, {});
              await BluetoothEscposPrinter.printText(
                '================================',
                {},
              );
              await BluetoothEscposPrinter.printPic(menu, {});
              await BluetoothEscposPrinter.printText(
                '================================',
                {},
              );
              await BluetoothEscposPrinter.printText('\r\n\r\n', {});
              await BluetoothEscposPrinter.printText('\r\n\r\n', {});
              await BluetoothEscposPrinter.printText('\r\n\r\n', {});

              // await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
              // await BluetoothEscposPrinter.printQRCode(
              //   'DP0837849839',
              //   350,
              //   BluetoothEscposPrinter.ERROR_CORRECTION.L,
              // );
              // await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
              // await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});

            } catch (e) {
              alert(e.message || 'ERROR');
            }
          }}
        />
      </View>
    </View>
  );

};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
