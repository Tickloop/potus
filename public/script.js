class App extends React.Component{
    state = {
        ht:'',
        wt:'',
        bd:'1',
        bm:'1',
        bs:'Alabama',
        party:'0'
    };

    handleChange = (e) => this.setState({[e.target.id]: e.target.value});
        
    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            height_in: this.state.ht,
            weight_lb: this.state.wt,
            birth_day: this.state.bd,
            birth_month: this.state.bm,
            birth_state: this.state.bs,
            political_party: this.state.party
        };
    
        // the options for making the POST request to be passed to fetch
        const options = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        // fetching the data from server
        fetch(`${window.location}potus`, options).then(resp => resp.json()).then(data => {
            document.getElementById('result').innerText = `There is a ${data.pred}% chance that you become the next president of USA`;
        });
    };

    render(){
        return(    
            <div className="app-content">
                <form onSubmit={this.handleSubmit}>
                    <div> <label htmlFor="height_in">Height (inches): </label>
                        <input type="text" id="ht" name="height_in" onChange={this.handleChange}></input></div>

                    <div>
                    <label htmlFor="weight_lb">Weight (lbs): </label>
                        <input type="text" id="wt" name="weight_lb" onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="birth_day">Birth Day (1-31): </label>
                        <select id="bd" name="birth_day" onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                    </div>
                    
                    <div>
                        <label htmlFor="birth_month">Birth Month (1-12): </label>
                        <select id="bm" name="birth_month" onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="birth_state">Birth State (in USA): </label>
                        <select id="bs" name="birth_state" onChange={this.handleChange}>
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="District Of Columbia">District Of Columbia</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
                            <option value="Georgia">Maryland</option>
                            <option value="Hawaii">Massachusetts</option>
                            <option value="Idaho">Michigan</option>
                            <option value="Illinois">Minnesota</option>
                            <option value="Indiana">Mississippi</option>
                            <option value="Iowa">Missouri</option>
                            <option value="Kansas">Montana</option>
                            <option value="Kentucky">Nebraska</option>
                            <option value="Maine">Nevada</option>
                            <option value="New Hampshire">New Hampshire</option>
                            <option value="New Jersey">New Jersey</option>
                            <option value="New Mexico">New Mexico</option>
                            <option value="New York">New York</option>
                            <option value="North Carolina">North Carolina</option>
                            <option value="North Dakota">North Dakota</option>
                            <option value="Ohio">Ohio</option>
                            <option value="Oklahoma">Oklahoma</option>
                            <option value="Oregon">Oregon</option>
                            <option value="Pennsylvania">Pennsylvania</option>
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">South Carolina</option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Virginia">Virginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconsin">Wisconsin</option>
                            <option value="Wyoming">Wyoming</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="political_party">Politcal Inclination: </label>
                        <select id="party" name="political_party" onChange={this.handleChange}>
                            <option value="0">Republican</option>
                            <option value="1">Democrat</option>
                        </select>
                    </div>
                    
                    <button id="submit">Sumbit!</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));