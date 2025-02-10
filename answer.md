### Q1.
> There is an array, each item has such format:
`{firstName: 'xxx', lastName: 'xxx', customerID: 'xxx', note: 'xxx', profession: 'xxx'}`
lastName, note can be empty, customerID can only be a set of digital numbers.
profession can only have ‘student’, ‘freelancer’, ‘productOwner’,‘engineer’ or ‘systemAnalytics’.

Please follow the principle (‘firstName’ + ‘lastName’ + ‘customerID’) to sort this array and print it out.

```javascript
function sortUserName(users) {
  return users.sort((a, b) => {
    return `${a.firstName}${a.lastName}${a.customerID}` >
      `${b.firstName}${b.lastName}${b.customerID}`
      ? 1
      : -1;
  });
}
```

Please sort by ‘profession’ to follow the principle.
(‘systemAnalytics’ > ‘engineer’ > ‘productOwner’ > ‘freelancer’ > ‘student’)

```javascript
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
```

### Q3.

> `let items = [1, 1, 1, 5, 2, 3, 4, 3, 3, 3, 3, 3, 3, 7, 8, 5, 4, 9, 0, 1, 3, 2, 6, 7, 5, 4, 4, 7, 8, 8, 0, 1, 2, 3, 1]`  
> Please write down a function to console log unique value from this array.

```javascript
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
```

### Q4.

>What is virtual DOM and what purpose does it aim to solve?

Virtual DOM 是前端框架（如 React,Vue）用來優化 UI 更新效率的技術。  
它是一個JavaScript物件，用來模擬實際 DOM 結構，以減少直接操作DOM的成本。  
直接操作真實 DOM 可能導致頻繁的重繪和重排，影響性能。  
當state或data發生變化時，框架會自動生成Virtual DOM，然後進行比對，只更新有變化的部分，減少不必要的重繪和重排。

### Q5.

>Can you explain about the type of never and what is the differ with void?

**never**: A function never returns (throws an error or enters an infinite loop)  

example:
```javascript
function throwError(message: string): never {
  throw new Error(message);
}
```

**void**: A function returns nothing  

example:
```javascript
function logMessage(message: string): void {
  console.log(message);
}
```

### Q6.

>What is difference between framework base website and normal website (none framework)?

### Q7.
<details>
<summary>

>Read the code below, please figure out why after “Switch Person” button clicked, the tasks state doesn’t update correctly, and how to make it update as we expected.

</summary>

```jsx
import { useState } from "react";
export default function TaskManager() {
  const [isPersonAlice, setIsPersonAlice] = useState(true);
  return (
    <div>
      {isPersonAlice ? (
        <TaskCounter name="Alice" />
      ) : (
        <TaskCounter name="Bob" />
      )}
      <button
        onClick={() => {
          setIsPersonAlice(!isPersonAlice);
        }}
      >
        Switch Person
      </button>
    </div>
  );
}
function TaskCounter({ name }) {
  const [tasks, setTasks] = useState(0);
  return (
    <>
      <h1>
        {name}'s tasks: {tasks}
      </h1>
      <button onClick={() => setTasks(tasks + 1)}>Complete Task</button>
    </>
  );
}
```
</details>

增加key值，讓React可以正確辨識元件，並更新正確的元件。

```jsx
{isPersonAlice ? (
  <TaskCounter key="Alice" name="Alice" />
) : (
  <TaskCounter key="Bob" name="Bob" />
)}
```
但切換人員時，state會重置，無法保留上次的計算結果。進一步修改如下
```jsx
...
<TaskCounter key="Alice" name="Alice" visible={isPersonAlice}/>
<TaskCounter key="Bob" name="Bob" visible={!isPersonAlice}/>
...
function TaskCounter({ name, visible }) {
  const [tasks, setTasks] = useState(0);
  return (
    <div style={{ display: visible ? "block" : "none" }}>
      <h1>
        {name}'s tasks: {tasks}
      </h1>
      <button onClick={() => setTasks(tasks + 1)}>Complete Task</button>
    </div>
  );
}
```

### Q8.
>Read about the code below, please describe the issues and how you will be going to improve it

```jsx
 const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "學習 React", completed: false, studyPoint: 3 },
    { id: 2, text: "建立專案", completed: false, studyPoint: 1 },
  ]);
  const { id, text, studyPoint } = todos; // todos 是陣列，無法直接解構
  const [basePoints, setbasePoints] = useState(3); // 沒用的東西
  const [sumPoints, setSumPoints] = useState(0);
  const toggleTodo = (id) => {
    const todo = todos.find((t) => t.id === id);
    todo.completed = !todo.completed;
    setTodos(todos);
  }; 
  // 這樣寫會讓 React 無法偵測到 state 的變化，無法觸發重新渲染
  const handleStudyPointsChange = (e) => {
    basePoints(e.target.value);
    setSumPoints(parseInt(value1) + parseInt(e.target.value));
  };
  // 完全亂寫一通？！應該直接用setTodos()更新 todos，然後在useEffect()中重新計算總點數
  return (
    <div>
      <p>課程名稱: {text}</p>
      <label>學習點數: </label>
      <input
        type="number"
        value={studyPoint}
        onChange={handleStudyPointsChange}
        //沒有給id，不知道要更新哪個 todo , event也沒有傳入function
      />
      <p>總累積點數: {sumPoints}</p>
      <button onClick={toggleTodo(id)}>篩選課程</button>
      {/*這樣會直接執行函式，應該要用() => toggleTodo(id)*/} 
      </div>
      // 這裡的結構也有問題，應該要用map()來渲染多個 todo, 總累積點數拆分出來, 在某個地方顯示completed or not
    );
  };
```


修正後的程式碼
```jsx
const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "學習 React", completed: false, studyPoint: 3 },
    { id: 2, text: "建立專案", completed: false, studyPoint: 1 },
  ]);
  const [sumPoints, setSumPoints] = useState(0);

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleStudyPointsChange = (e, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, studyPoint: e.target.value } : todo
      )
    );
  };

  useEffect(() => {
    setSumPoints(
      todos.reduce(
        (acc, todo) => acc + (todo.completed ? Number(todo.studyPoint) : 0),
        0
      )
    );
  }, [todos]);

  return (
    <>
      {todos.map((todo) => {
        const { id, text, studyPoint, completed } = todo;
        return (
          <div key={id}>
            <p>課程名稱: {text}</p>
            <label>學習點數: </label>
            <input
              type="number"
              value={studyPoint}
              onChange={(e) => {
                handleStudyPointsChange(e, id);
              }}
            />
            <button onClick={() => toggleTodo(id)}>
              {completed ? "完成" : "未完成"}
            </button>
          </div>
        );
      })}
      <p>總累積點數: {sumPoints}</p>
    </>
  );
}
```
### Q9.
<details>
<summary>

>Read about the code below, suggest how to improve the code.

</summary>

```jsx
function ParentComponent() {
  const [name, setName] = useState("Naro");
  const [age, setAge] = useState(12);
  return (
    <div>
      <ChildComponent name={name} age={age} />
      <GrandchildComponent name={name} age={age} />
    </div>
  );
}
function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <GrandchildComponent name={name} age={age} />
    </div>
  );
}
function GrandchildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```
</details>


🚀 Improve
```jsx
 const UserContext = createContext();
 function ParentComponent() {
   const [user, setUser] = useState({ name: "Naro", age: 12 });
   return (
     <UserContext.Provider value={user}>
       <div>
         <ChildComponent />
         <GrandchildComponent />
       </div>
     </UserContext.Provider>
   );
 }
 function ChildComponent() {
   const { name, age } = useContext(UserContext);
   return (
     <div>
       <p>Name: {name}</p>
       <p>Age: {age}</p>
       <GrandchildComponent />
     </div>
   );
 }
 function GrandchildComponent() {
   const { name, age } = useContext(UserContext);
   return (
     <div>
       <p>Name: {name}</p>
       <p>Age: {age}</p>
     </div>
   );
 }
```

### Q10.
<details>
<summary>

>Read about the code below, achieving that make input element in “SearchInput” to be focused while search button on click
</summary>

```jsx
function SearchButton() {
  return <button> Search </button>;
}
function SearchInput() {
  return <input />;
}
export default function Page() {
  return (
    <>
      <nav>
        <SearchButton />
      </nav>
      <SearchInput />
    </>
  );
}
```

</details>

```jsx
function SearchButton({ inputRef }) {
  return <button onClick={() => inputRef.current?.focus()}> Search </button>;
}
function SearchInput({ inputRef }) {
  return <input ref={inputRef} />;
}
export default function Page() {
  const inputRef = useRef(null);
  return (
    <>
      <nav>
        <SearchButton inputRef={inputRef} />
      </nav>
      <SearchInput inputRef={inputRef} />
    </>
  );
} 
```