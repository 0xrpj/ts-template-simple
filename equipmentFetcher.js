const axios = require('axios');
const ObjectsToCsv = require('objects-to-csv');

const apiUrl = 'https://api.gangstabet.io/api/public/token/';

const accessoriesData = [];

async function fetchAccessoriesData(id) {
  try {
    console.log(`${apiUrl}${id}`);
    const response = await axios.get(`${apiUrl}${id}`);
    const attributes = response.data.attributes;
    const accessory = attributes.find(attr => attr.key === 'Accessory');
    console.log(accessory);
    if (!accessory) {
      console.log(attributes);
    }
    if (accessory) {
      accessoriesData.push({ id, accessory: accessory.value });
      console.log(`Processed data for ID: ${id}`);
    } else {
      accessoriesData.push({ id, accessory: 'DEFAULT' });
    }
  } catch (error) {
    console.error(`Error fetching data for ID: ${id}`, error);
  }
}

async function fetchAllAccessoriesData() {
  const promises = [];
  for (let i = 1; i <= 5555; i++) {
    promises.push(fetchAccessoriesData(i));
    // await fetchAccessoriesData(i);
  }
  await Promise.all(promises);
  const csv = new ObjectsToCsv(accessoriesData);
  await csv.toDisk('./accessories.csv', { append: true });
  console.log('Data saved to file: accessories.csv');
}

fetchAllAccessoriesData();
