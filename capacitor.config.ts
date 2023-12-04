import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Boak.app',
  appName: 'Boax',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
