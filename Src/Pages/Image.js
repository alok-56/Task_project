import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Images = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchImages();
  }, [offset]);

  const fetchImages = async () => {
    try {
      const formData = new FormData();
      formData.append('user_id', '108');
      formData.append('offset', offset.toString());
      formData.append('type', 'popular');

      const response = await fetch('http://dev3.xicom.us/xttest/getdata.php', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data.images]);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const renderImageItem = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('details Screen',{
      image:item.xt_image
    })}>
      <View style={styles.imageItem}>
        <Image source={{uri: `${item.xt_image}`}} style={styles.image} />
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    setOffset(prevOffset => prevOffset + 1);
    fetchImages();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={images}
        renderItem={renderImageItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        onPress={handleLoadMore}
        style={{
          width: '60%',
          alignSelf: 'center',
          height: 30,
          backgroundColor: 'aqua',
          borderRadius: 8,
          marginBottom: 10,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#000',
            }}>
            Load More
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  imageItem: {
    flex: 1,
    margin: 5,
  },
  image: {
    borderRadius: 8,
    width: width - 10,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
});

export default Images;
