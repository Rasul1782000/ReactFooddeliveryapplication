import { Platform } from 'react-native';

// When running on a physical device, replace with your local IP address.
// On Android, you can find this in Settings > Wi-Fi > Advanced > IP address.
// On iOS, you can find this in Settings > Wi-Fi > (your network) > IP address.
// On Windows, you can run `ipconfig` in the terminal.
// On macOS/Linux, you can run `ifconfig` or `ip addr` in the terminal.
const DEV_IP = 'YOUR_LOCAL_IP_ADDRESS'; // <<<< REPLACE THIS
const PORT = '5000';

// For Android Emulator, the IP address of the host machine is 10.0.2.2
// For iOS Simulator, it's localhost
// For web, it's localhost
export const API_URL = Platform.select({
  android: `http://${DEV_IP}:${PORT}/api/food`,
  ios: `http://${DEV_IP}:${PORT}/api/food`,
  default: `http://localhost:${PORT}/api/food`,
});
