import { FC, useEffect, useState } from 'react'
import { Table } from 'antd'

import { getWeather } from './API/weatherAPI'
import { getTeams } from './API/footballAPI'

import './App.css';

const findRecordWithSmallestDifferenceBetween = (column1: string, column2: string, records: Array<any>) => {
  return records.reduce((selectedRecord, record) => {
    if (!selectedRecord) return record

    const selectedDifference = Math.abs(selectedRecord[column1] - selectedRecord[column2])
    const currentDifference = Math.abs(record[column1] - record[column2])
    debugger
    if (currentDifference < selectedDifference) {
      return record
    } else {
      return selectedRecord
    }
  }, undefined)
}

type weatherDayType = {
  'title': number,
  'MxT': number,
  'MnT': number,
}

interface WeatherTableInterface {
  weatherDays: Array<weatherDayType>
}

const WeatherTable: FC<WeatherTableInterface> = ({ weatherDays }) => {
  const selectedDay = findRecordWithSmallestDifferenceBetween('MxT', 'MnT', weatherDays)

  if (!selectedDay)
    return null

  const columns = [
    {
      title: 'Day number',
      dataIndex: 'Dy',
      key: 'Dy',
    },
    {
      title: 'Maximum temperature',
      dataIndex: 'MxT',
      key: 'MxT',
    },
    {
      title: 'Minimum temperature',
      dataIndex: 'MnT',
      key: 'MnT',
    },
  ];

  const dataSource = [
    {
      key: selectedDay.Dy,
      Dy: selectedDay.Dy,
      MxT: selectedDay.MxT,
      MnT: selectedDay.MnT,
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
}

type footballTeamType = {
  'title': string,
  'F': number,
  'A': number,
}

interface FootballTableInterface {
  footballTeams: Array<footballTeamType>
}

const FootballTable: FC<FootballTableInterface> = ({ footballTeams }) => {
  const selectedFootballTeam = findRecordWithSmallestDifferenceBetween('F', 'A', footballTeams)

  if (!selectedFootballTeam)
    return null

  const columns = [
    {
      title: 'Team name',
      dataIndex: 'Team',
      key: 'Team',
    },
    {
      title: 'For',
      dataIndex: 'F',
      key: 'F',
    },
    {
      title: 'Against',
      dataIndex: 'A',
      key: 'A',
    },
  ];

  const dataSource = [
    {
      key: selectedFootballTeam.Team,
      Team: selectedFootballTeam.Team,
      F: selectedFootballTeam.F,
      A: selectedFootballTeam.A,
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
}

export const App: FC = () => {
  const [weatherDays, setWeatherDays] = useState<any[]>([])
  const [footballTeams, setFootballTeams] = useState<any[]>([])

  useEffect(() => {
    getWeather().then(setWeatherDays)
    getTeams().then(setFootballTeams)
  }, [])

  return (
    <div className="App">
      <h1>Test technique: Gabriel Gagnon</h1>
      {weatherDays && <WeatherTable weatherDays={weatherDays} />}
      {footballTeams && <FootballTable footballTeams={footballTeams} />}
    </div>
  );
}