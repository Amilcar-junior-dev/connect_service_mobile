import {Redirect} from "expo-router"

export default function RootLayout() {

  const MockToken = {
    token: false
  }
  if(MockToken.token){
    return <Redirect href="/(private)/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
}
