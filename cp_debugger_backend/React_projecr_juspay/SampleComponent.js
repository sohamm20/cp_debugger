
// import {useState} from 'react';

// userState. 
// setCount = should change all the referrances of count variable 
// count stores

var useStateCount = 0;
var totalCount = 0;

var curr_id = 0;

// var is_this_first_render = 1;

function useState(count_input) {

    useStateCount += 1;

    var currUseStateId = useStateCount % totalCount;

    if (!is_this_first_render){
        return [count, setCount];
    }

    let id = curr_id;
    curr_id += 1;

    let count = count_input;

    function setCount(updated_count){

        let id_of_current_use_state = id;

        count = updated_count;
        re_render();

    }

    is_this_first_render = 0;
    totalCount += 1;

    return [count, setCount];

}

// Task ; when we call useState, find which set of variables we are assigning the return.

// useStateCount = (variable which stores how many times till now use state count function is executed)
// totalCount = Total count of useState() calls in the current fucnction
// when take useStateCount % totalCount --> which usestate we are execuring

function SampleComponent() {

    let [count, setCount] = useState(0);
    let [count_2, setCount_2] = useState(0);

    function incrementCounter(){
        setCount(count + 1);
        console.log('Counter incremented');
    }

    return (
        <div>

            <h1>The count is : {count}</h1>

            <button onClick={incrementCounter}>Increment</button>

        </div>
    )






    // <button onClick = {incrementCounter}></button>



}

export defalut SampleComponent;
