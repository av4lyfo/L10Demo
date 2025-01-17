import React,{useState,useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View} from 'react-native';

let originalData = [];


const App = () => {
  const [mydata, setMydata] = useState([]);

  //Add fetch() - Exercise 1A
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          if (originalData.length < 1) {
            setMydata(myJson);
            originalData=myJson;
          }
        })
  },[]);

  const FilterData = (text) => {
    if(text!='') {
      let myFilteredData = originalData.filter((item)=>
      item.title.includes(text));
      setMydata(myFilteredData);
    }
    else{
      setMydata(originalData);
    }
  }

  // fetch("https://jsonplaceholder.typicode.com/albums")
  //     .then((response)=>{
  //       return response.json();
  //     })
  //     .then((myJson)=>{
  //       setMydata(myJson);
  //     })

  const renderItem = ({item, index}) => {
    return (
    <View>
    <Text style={{borderWidth:1}}>{item.title}</Text>
    </View>
    );
  };

  return (
    <View>
      <StatusBar/>
      <Text>Search:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text)=>{FilterData(text)}}/>
      <FlatList data={mydata} renderItem={renderItem} />
    </View>
  );
}

export default App;
