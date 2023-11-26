import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.boax.com',
  appName: 'Boax',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
