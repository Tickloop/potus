// the elemnts to be referrenced
const sub_btn = document.getElementById('submit');
const height_input = document.getElementById('ht');
const weight_input = document.getElementById('wt');
const birth_day_select = document.getElementById('bd');
const birth_month_select = document.getElementById('bm');
const birth_state_select = document.getElementById('bs');
const political_party_select = document.getElementById('party');
const result_div = document.getElementById('result');

// adding an event listener, for preventing default and handling the form
sub_btn.addEventListener('click', (e) => {
    e.preventDefault();
    
    //creating the data
    data = {
        height_in: height_input.value,
        weight_lb: weight_input.value,
        birth_day: birth_day_select.value,
        birth_month: birth_month_select.value,
        birth_state: birth_state_select.value,
        political_party: political_party_select.value,
    };
    
    // the options for making the POST request to be passed to fetch
    const options = {
        method: 'POST',
        body: JSON.stringify(data)
    };

    // fetching the data from server
    fetch(`${window.location}potus`, options).then(resp => resp.json()).then(data => {
        result_div.innerText = `There is a ${data.pred} chance that you become the next president of USA`;
    });
});