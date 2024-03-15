import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ProduceItem from "./ProductItem";

const ProductItemList = ({
  title,
  data,
  backgroundColor,
  productBackgroundColor,
  containerPadding,
  textAlignment,
  navigation,
  productWidth,
  productHeight,
}) => {
  return (
    <View style={{ width: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 14,
            fontWeight: 600,
            marginVertical: 13,
          }}
        >
          {title}
        </Text>
        <TouchableOpacity>
          <Text style={{ color: "black", textDecorationLine: "underline" }}>
            Show All {">"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor,
          padding: containerPadding ? containerPadding : 0,
          elevation: 5, // apply shadow
          shadowColor: "black", // shadow color
          shadowOffset: { width: 0, height: 2 }, // shadow offset
          shadowOpacity: 0.2, // shadow opacity
          shadowRadius: 4, // shadow radius
        }}
      >
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ProduceItem
              item={item}
              width={productWidth ?? 120}
              height={productHeight ?? 160}
              backgroundColor={productBackgroundColor}
              textAlign={textAlignment}
              navigation={navigation}
            />
          )}
          horizontal
        />
      </View>
    </View>
  );
};

export default ProductItemList;
