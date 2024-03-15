import {createStackNavigator} from '@react-navigation/stack';
import AddProductScreen from '../components/AddProduct/AddProductScreen';
import AddProductPrice from '../components/AddProduct/AddPriceScreen';
import ChooseProduct from '../components/AddProduct/ChooseProduct';
import ProductDetails from '../components/AddProduct/ProductDetails';
import AddCategoryScreen from '../components/AddProduct/AddCategoryScreen';

const Stack = createStackNavigator();

function ProductListingNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="AddPrice" component={AddProductPrice} />
      <Stack.Screen name="ChooseProduc" component={ChooseProduct} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}
export default ProductListingNavigator;
