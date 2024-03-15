import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import AppHeader from '../common/header/AppHeader';
import {getGraphData} from '../../actions/GraphActions';
import MySelectInput from '../common/form/MySelectInput';

import {
  View,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;

import GraphCard from './GraphCard';
import GraphSubCards from './GraphSubCards';

const money = require('../../../assets/profile/money.png');
const clock = require('../../../assets/profile/clock.png');
const podium = require('../../../assets/profile/podium.png');
const click = require('../../../assets/profile/click.png');

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue line
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  withShadow: false,
  withOuterLines: false,
  propsForDots: {
    r: '0', // Remove dots on the line
  },
  style: {
    borderRadius: 0,
  },
};

const GraphScreen = ({navigation}) => {
  const Usertoken = useSelector(state => state.preserveReducer.Usertoken);
  const userAssets = useSelector(state => state.assetsReducer.userAssets);
  const optionData = userAssets?.map(item => ({
    label: item.title,
    value: item.id.toString(),
  }));
  const graphData = useSelector(state => state.graphReducer.graphData);
  const [selectedValue, setSelectedValue] = useState('option1');

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Blue line
        strokeWidth: 2,
      },
    ],
  });

  const dispatch = useDispatch();
  useEffect(() => {
    if (Usertoken) {
      dispatch(getGraphData(Usertoken));
    }
  }, []);

  const handleDropdownChange = item => {
    setSelectedValue(item);
    const id = parseInt(item, 10);
    const asset = userAssets?.find(asset => asset.id === id);
    if (
      typeof asset.price_change === 'string' &&
      asset.price_change.trim() === '--- []'
    ) {
    } else {
      setChartData(prevData => ({
        ...prevData, // Copy existing properties
        datasets: [
          {
            ...prevData.datasets[0], // Copy existing dataset properties
            data: asset.price_change, // Update the 'data' property
          },
        ],
      }));
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
      }}>
      <AppHeader
        title={'Business Stats'}
        leftIcon={'left'}
        leftCallback={() => navigation.goBack()}
      />
      <GraphCard
        totalSale={graphData.sale_asset}
        totalRevenue={graphData.net_total}
      />
      <View
        style={{
          width: '90%',
          justifyContent: 'space-evenly',
          borderRadius: 10,
        }}>
        <MySelectInput
          selectProps={{
            zIndex: 100,
            zIndexInverse: 300,
            placeholder: 'Choose Asset',
            onChangeValue: item => {
              // setSelectedValue(item);
              handleDropdownChange(item);
            },
          }}
          options={optionData}
        />
      </View>

      <LineChart
        data={chartData}
        width={screenWidth}
        height={280}
        // verticalLabelRotation={30}
        chartConfig={chartConfig}
        withHorizontalLines={false}
        withVerticalLines={false}
        withHorizontalLabels={false}
        bezier
        withShadow={false}
        withOuterLines={false}
      />

      <GraphSubCards
        imageFirst={money}
        imageSecond={clock}
        firstBoxText={'Net Volume for Sale'}
        secondBoxText={'Dispute Activity'}
        firstBoxData={`$ ${graphData.sale_asset}`}
        secondBoxData={'23'}
      />
      <GraphSubCards
        imageFirst={podium}
        imageSecond={click}
        firstBoxText={'Average Spend per Customer'}
        secondBoxText={'New Cutomers'}
        firstBoxData={`$ ${graphData.average_spend}`}
        secondBoxData={graphData.total_clicks}
      />
    </View>
  );
};

export default GraphScreen;
