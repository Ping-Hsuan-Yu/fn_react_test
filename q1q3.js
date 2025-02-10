/**
Q1. 
There is an array, each item has such format:
{firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx', profession: ‘xxx’}
lastName, note can be empty, customerID can only be a set of digital numbers.
profession can only have ‘student’, ‘freelancer’, ‘productOwner’, ‘engineer’ or
‘systemAnalytics’.
**/
/**
Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’) to sort this
array and print it out.
**/

const users = [
  {
    firstName: "John",
    lastName: "Snow",
    customerID: "123",
    note: "xxx",
    profession: "student",
  },
  {
    firstName: "Jane",
    lastName: "Woof",
    customerID: "456",
    note: "xxx",
    profession: "freelancer",
  },
  {
    firstName: "Tom",
    lastName: "Meow",
    customerID: "789",
    note: "xxx",
    profession: "productOwner",
  },
  {
    firstName: "Tom",
    lastName: "Doe",
    customerID: "739",
    note: "xxx",
    profession: "productOwner",
  },
  {
    firstName: "Jerry",
    lastName: "Doe",
    customerID: "101",
    note: "xxx",
    profession: "engineer",
  },
  {
    firstName: "Jerry",
    lastName: "Hey",
    customerID: "102",
    note: "xxx",
    profession: "engineer",
  },
  {
    firstName: "Alice",
    lastName: "Doe",
    customerID: "112",
    note: "xxx",
    profession: "systemAnalytics",
  },
];

function sortUserName(users) {
  return users.sort((a, b) => {
    return `${a.firstName}${a.lastName}${a.customerID}` >
      `${b.firstName}${b.lastName}${b.customerID}`
      ? 1
      : -1;
  });
}
console.log(sortUserName(users));

/**
Please sort by ‘profession’ to follow the principle.
(‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ > ‘student’’)
**/
function sortByType(users) {
  return users.sort((a, b) => {
    const professionOrder = {
      student: 1,
      freelancer: 2,
      productOwner: 3,
      engineer: 4,
      systemAnalytics: 5,
    };
    return professionOrder[b.profession] - professionOrder[a.profession];
  });
}
console.log(sortByType(users));

/**
Q3.
let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5,
4, 4, 7, 8, 8, 0, 1, 2, 3, 1];
Please write down a function to console log unique value from this array.
**/
function getUniqueNumber(arr) {
  const uniqueItems = [...new Set(arr)];
  console.log(uniqueItems);
}

function getTrulyUniqueNumbers(arr) {
  const countMap = new Map();

  arr.forEach((num) => countMap.set(num, (countMap.get(num) || 0) + 1));

  const uniqueValues = [...countMap.entries()]
    .filter(([key, value]) => value === 1)
    .map(([key]) => key);

  console.log(uniqueValues);
}

let items = [
  1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5, 4,
  4, 7, 8, 8, 0, 1, 2, 3, 1,
];
getUniqueNumber(items);
getTrulyUniqueNumbers(items);