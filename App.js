import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  Button,
  DeviceEventEmitter,
  Image,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer';
import ItemList from './ItemList';
import Console from './components/Console';

const App = () => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [boundAddress, setBoundAddress] = useState('');

  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      err => {
        err;
      },
    );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
      });
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
        deviceFoundEvent(rsp);
      });
      bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setName('');
        setBoundAddress('');
      });
    } else if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
        deviceFoundEvent(rsp);
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
        setName('');
        setBoundAddress('');
      });
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
        ToastAndroid.show('Device Not Support Bluetooth !', ToastAndroid.LONG);
      });
    }
    if (pairedDevices.length < 1) {
      scan();
    }
  }, [boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan]);

  const deviceAlreadPaired = useCallback(
    rsp => {
      var ds = null;
      if (typeof rsp.devices === 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) { }
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = useCallback(
    rsp => {
      var r = null;
      try {
        if (typeof rsp.device === 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const connect = row => {
    setLoading(true);
    BluetoothManager.connect(row.address).then(
      s => {
        setLoading(false);
        setBoundAddress(row.address);
        setName(row.name || 'UNKNOWN');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const unPair = address => {
    setLoading(true);
    BluetoothManager.unpaire(address).then(
      s => {
        setLoading(false);
        setBoundAddress('');
        setName('');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      s => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      er => {
        setLoading(false);
        // ignore
      },
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: 'HSD bluetooth meminta izin untuk mengakses bluetooth',
          message: 'HSD bluetooth memerlukan akses ke bluetooth untuk proses koneksi ke bluetooth printer',
          buttonNeutral: 'Lain Waktu',
          buttonNegative: 'Tidak',
          buttonPositive: 'Boleh',
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions,
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          // ignore akses ditolak
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  const [showBluetooth, setShowBlueTooth] = useState(true)
  const [showConsole, setShowConsole] = useState(false)

  return (
    <>
      <View style={[styles.container, { display: (showBluetooth ? null : 'none') }]} >
        <View style={styles.bluetoothStatusContainer}>
          <Text style={styles.bluetoothStatus(bleOpend ? '#47BF34' : '#A8A9AA')}>
            Bluetooth {bleOpend ? 'On' : 'Off'}
          </Text>
        </View>
        {!bleOpend && <Text style={styles.bluetoothInfo}>Please turn on bluetooth</Text>}
        <Text style={styles.sectionTitle}>Printer :</Text>
        {boundAddress.length > 0 && (
          <ItemList
            label={name}
            value={boundAddress}
            onPress={() => unPair(boundAddress)}
            actionText="Disconnect"
            color="#E9493F"
          />
        )}
        {boundAddress.length < 1 && (
          <Text style={styles.printerInfo}>No printer available</Text>
        )}
        <Text style={styles.sectionTitle}>Bluetooth In your device:</Text>
        {loading ? <ActivityIndicator animating={true} /> : null}
        <View style={styles.containerList}>
          {pairedDevices.map((item, index) => {
            return (
              <ItemList
                key={index}
                onPress={() => connect(item)}
                label={item.name}
                value={item.address}
                connected={item.address === boundAddress}
                actionText="Connect"
                color="#00BCD4"
              />
            );
          })} 
        </View>

        <Button
          title="Go to MENU"
          onPress={() => {
            setShowBlueTooth(false)
            setShowConsole(true)
          }}
        />
 
        <View style={{ height: 100 }} />
      </View>
      <Console showConsole={showConsole} />
    </>
  );
};

const order = StyleSheet.create({
  main: {
    position: 'relative',
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderWidth: 1
  },
  font: {
    fontSize: 50,
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  containerList: { flex: 1, flexDirection: 'column' },
  bluetoothStatusContainer: { justifyContent: 'flex-end', alignSelf: 'flex-end' },
  bluetoothStatus: color => ({
    backgroundColor: color,
    padding: 8,
    borderRadius: 2,
    color: 'white',
    paddingHorizontal: 14,
    marginBottom: 20,
  }),
  bluetoothInfo: { textAlign: 'center', fontSize: 16, color: '#FFC806', marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 12 },
  printerInfo: { textAlign: 'center', fontSize: 16, color: '#E9493F', marginBottom: 20 },
});

export default App;
