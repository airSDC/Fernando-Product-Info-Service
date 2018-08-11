const faker = require('faker');
const fs = require('fs');

const PROPERTY_TYPE = [
  'Apartment',
  'Castle',
  'Cabin',
  'Apartment',
  'Entire Home',
  'Private Room',
  'Shared Space',
  'Mill',
  'Dome House'
];
const BED_TYPE = ['single', 'queen', 'double', 'king'];

const AMENITY_DATA = [
  { amenityType: 'Basic', name: 'Air conditioning', icon: '', explanation: '' },
  {
    amenityType: 'Basic',
    name: 'Private entrance',
    icon: '',
    explanation: 'Separate street or building entrance'
  },

  {
    amenityType: 'Basic',
    name: 'Heating',
    icon: '',
    explanation: 'Central heating or a heater in the listing'
  },

  { amenityType: 'Dining', name: 'Breakfast', icon: '', explanation: '' },

  {
    amenityType: 'Bed and bath',
    name: 'Hair dryer',
    icon: '',
    explanation: ''
  },
  { amenityType: 'Bed and bath', name: 'Shampoo', icon: '', explanation: '' },
  { amenityType: 'Bed and bath', name: 'Hangers', icon: '', explanation: '' },
  {
    amenityType: 'Bed and bath',
    name: 'Bed linens',
    icon: '',
    explanation: ''
  },
  { amenityType: 'Bed and bath', name: 'Washer', icon: '', explanation: '' },
  {
    amenityType: 'Safety features',
    name: 'Smoke detector',
    icon: '',
    explanation: ''
  },
  {
    amenityType: 'Safety features',
    name: 'Carbon monoxide detector',
    icon: '',
    explanation: ''
  }
];

const defaultAmenities = [
  { amenityType: 'Basic', name: 'Wifi', icon: 'fa fa-wifi', explanation: '' },
  {
    amenityType: 'Basic',
    name: 'TV',
    icon: 'fa fa-television',
    explanation: ''
  },
  {
    amenityType: 'Basic',
    name: 'Hot water',
    icon: 'fa fa-shower',
    explanation: ''
  },
  {
    amenityType: 'Dining',
    name: 'Kitchen',
    icon: 'fa fa-cutlery',
    explanation: 'Space where guests can cook their own meals'
  },
  {
    amenityType: 'Facilities',
    name: 'Free parking on premises',
    icon: 'fa fa-car',
    explanation: ''
  },
  {
    amenityType: 'Basic',
    name: 'Laptop friendly workspace',
    icon: 'fa fa-laptop',
    explanation:
      'A table or desk with space for a laptop and a chair that’s comfortable to work in'
  }
];

const populateRandomAmenities = num => {
  let newAmenity = defaultAmenities.slice();
  let allAmenities = AMENITY_DATA.slice();
  for (let i = 0; i < num; i++) {
    let index = Math.floor(Math.random() * allAmenities.length);
    newAmenity.push(allAmenities[index]);
    allAmenities.splice(index, 1);
  }
  return newAmenity;
};

const createAmenities = (start, end, counter = 1) => {
  const CSV = fs.createWriteStream(`./CSV/${start}_amenities.csv`); 
  for (start; start < end; start++) { 
    const amenities = populateRandomAmenities(faker.random.number({ min: 4, max: 7 }));
    for (let i = 0; i < amenities.length; i++) {
      let amenityRow = '';
      amenityRow += `${start},`;
      for (let key in amenities[i]) {
        amenityRow += `${amenities[i][key]},`
      }
      CSV.write(`${counter},${amenityRow.slice(0,amenityRow.length-1)}\n`);
      counter++;
    }
  }
  return counter;
};


const createRoom = (start, end) => {
  const file = fs.createWriteStream(`./${start}.csv`);  
  let room = end - start;
  while (room--) {
    const sentenceLength = faker.random.number({ min: 1, max: 3 });
    const id = `${start},`;
    const name = `room${start},`;
    const city = `${faker.address.city()},`;
    const type = `${PROPERTY_TYPE[Math.floor(Math.random() * PROPERTY_TYPE.length)]},`;
    const title = `${ faker.lorem.sentences(faker.random.number({ min: 1, max: 3 }))},`;
    const max_guest = `${faker.random.number({ min: 1, max: 4 })},`;
    const subtype =  `${faker.random.number({ min: 1, max: 4 })},`;
    const numBeds = `${faker.random.number({ min: 1, max: 4 })},`;
    const numBaths = `${faker.random.number({ min: 1, max: 4 })},`;
    const host = `${faker.name.findName()},`;
    const avatar = `${faker.image.avatar()},`;
    const short_desc = `${faker.lorem.sentences(faker.random.number({ min: 1, max: 3 }))},`;
    const main_desc = `${faker.lorem.sentences(faker.random.number({ min: 1, max: 3 }))},`;
    const house_rules_desc = `${faker.lorem.sentences(faker.random.number({ min: 1, max: 3 }))},`;
    const highlights = `${faker.lorem.sentences(faker.random.number({ min: 1, max: 3 }))}* ${faker.lorem.sentences(faker.random.number({ min: 2, max: 5 }))},`;
 
    const noOfRules = faker.random.number({ min: 1, max: 3 });
    let rules = '';
    for (let j = 0; j < noOfRules; j++) {
      rules += `${faker.lorem.sentences(faker.random.number({ min: 1, max: 3 }))}* `;
    }
    const house_rules = `${rules},`;

    const cancellationsLength = faker.random.number({ min: 1, max: 3 });
    let cancelationRules = '';
    for (let j = 0; j < cancellationsLength; j++) {
      cancelationRules += `${faker.lorem.sentences(faker.random.number({ min: 1, max: 3 }))}* `;
    }
    const cancellations = `${cancelationRules},`;

    let beds = faker.random.number({ min: 1, max: 4 });
    let sleeping_arrange = '';
    for (let x = 0; x < beds; x++) {
      let bedDetails = '';
      const noOfBed = faker.random.number({ min: 1, max: 2 });
      const typeOfBEd = BED_TYPE[Math.floor(Math.random() * BED_TYPE.length)];
      if (noOfBed === 1) {
        bedDetails = `${noOfBed} ${typeOfBEd} ` + 'bed';
      } else {
        bedDetails = `${noOfBed} ${typeOfBEd} ` + 'beds';
      }
      sleeping_arrange += `${bedDetails}* `;
    }
    start++
    const CSV = `${id}${name}${city}${type}${title}${max_guest}${subtype}${numBeds}${numBaths}${host}${avatar}${short_desc}${main_desc}${house_rules_desc}${highlights}${house_rules}${cancellations}${sleeping_arrange}\n`;
    file.write(CSV);
  }
};
