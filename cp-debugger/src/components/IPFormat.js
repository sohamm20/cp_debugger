import React, {useState} from 'react';

function submitNumberOfLines() {
    console.log('this is working');
}

function IPFormat() {

    const [inputValue, setInputValue] = useState('1');

    var item = [];

    for (var i = 0; i < inputValue; i++){
        item.push(0);
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);

        item = [];

        for (var i = 0; i < inputValue; i++){
            item.push(0);
        }
    }

    const handleSubmit = () => {
        alert('You have submitted');
    }

    

    

    return (
        <div>
            <br>
            </br>

            <p>Enter number of input lines</p>

            <input 
                id="inputBox" 
                type="text" 
                value = {inputValue}
                onChange = {handleInputChange}
                placeholder="Type something here" 
            />
            <br>
            </br>
            <br>
            </br>
            <div style={{display:'flex', flexDirection:'column'}}>
            {
                item.map((item, index) => (
                    <select
                        id="myDropdown"
                        // value={selectedOption}
                        // onChange={handleChange}
                    >
                        <option value="">--Please choose an option--</option>
                        <option value="option1">Number</option>
                        <option value="option2">String</option>
                        <option value="option3">Array</option>
                    </select>
                ))
                
            }
            </div>

        </div>
        
    )
}

export default IPFormat;