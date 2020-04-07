import React, { useState, useEffect } from "react";
import "./App.css";

import {makeStyles} from '@material-ui/core/styles'

//Components


const App = () => {

	const [data, setData] = useState(null)
	const [chartData, setChartData] = useState(null)
	const [counter, setCounter] = useState(360)


	useEffect(()=>{
		getData()
		startTimer()
	}, [])

	const startTimer = () => {
		// console.log("updating")
		let remaining = counter
		let interval = setInterval(()=>{
			remaining --;
			if (remaining <= 0) {
				getData();
				remaining = counter
			}
		}, 1000);
	}

	const getData = ()=> {
		fetch('./data/data.json')
			.then(res=>{
				if (res.ok) {
					return res.json()
				} 
			})
			.then(json=>{
				setData(json.customList[0])
			})
			.catch(e=>{
				console.log(e)
			})

	}

    const small = screen.width < 600


	return (
		<div className="widget_main">
			{data && 
				<div className="widget_content">
					<div className="widget_title">World Totals</div>
					<div className="widget_dataContainer">
						<div className="widget_data"><div className="widget_label">Total: </div><div className="widget_value">{data.confirmed.replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")}</div></div>
						<div className="widget_data"><div className="widget_label">Deaths: </div><div className="widget_value">{data.deaths.replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")}</div></div>
						<div className="widget_data"><div className="widget_label">Recovered: </div><div className="widget_value">{data.recovered.replace( /\d{1,3}(?=(\d{3})+(?!\d))/g , "$&,")}</div></div>
					</div>
				</div>

			}
		</div>
	);
}

export default App;