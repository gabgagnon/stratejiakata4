import { FC, useEffect, useState } from 'react'

import { getWeather } from './API/weatherAPI'
import { getTeams } from './API/footballAPI'

import './App.css';

export const App: FC = () => {
  const [weatherDays, setWeatherDays] = useState<any[]>([])
  const [footballTeams, setFootballTeams] = useState<any[]>([])

  useEffect(() => {
    getWeather().then((weatherDaysFetched) => setWeatherDays(weatherDaysFetched))
    getTeams().then((footballTeamsFetched) => setFootballTeams(footballTeamsFetched))
  }, [])

  debugger
  return (
    <div className="App">
      <h1>Test technique: Gabriel Gagnon</h1>
    </div>
  );
}