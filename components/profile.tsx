import React from "react";
import { View, Image } from "react-native";

function AvatarDemo() {
  return (
    <View className="flex-row items-center gap-4">
      <View className="h-20 w-20 overflow-hidden rounded-full bg-blue-500">
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1740677584609-b3139498b608?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R29vZCUyMGJveXxlbnwwfHwwfHx8MA%3D%3D" }} 
          className="h-full w-full"
        />
      </View>

      <View className="h-16 w-16 overflow-hidden rounded-full bg-blue-500">
        <Image 
          source={{ uri: "https://images.unsplash.com/photo-1740677584609-b3139498b608?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R29vZCUyMGJveXxlbnwwfHwwfHx8MA%3D%3D" }} 
          className="h-full w-full"
        />
      </View>
    </View>
  );
}

export default AvatarDemo;
