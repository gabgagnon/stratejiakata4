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

const WeatherTable: FC<any> = ({ weatherDays }) => {
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

  return <Table columns={columns} dataSource={dataSource} />;
}

const FootBallTable: FC<any> = ({ teams }) => {
  const selectedDay = findRecordWithSmallestDifferenceBetween('F', 'A', teams)

  if (!selectedDay)
    return null

  const columns = [
    {
      title: 'Team name',
      dataIndex: 'Team',
      key: 'Team',
    },
    {
      title: 'F',
      dataIndex: 'F',
      key: 'F',
    },
    {
      title: 'A',
      dataIndex: 'A',
      key: 'A',
    },
  ];

  const dataSource = [
    {
      key: selectedDay.Team,
      Team: selectedDay.Team,
      F: selectedDay.F,
      A: selectedDay.A,
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}

export const App: FC = () => {
  const [weatherDays, setWeatherDays] = useState<any[]>([])
  const [footballTeams, setFootballTeams] = useState<any[]>([])

  useEffect(() => {
    getWeather().then((data) => setWeatherDays(data))
    getTeams().then((data) => setFootballTeams(data))
  }, [])

  return (
    <div className="App">
      <h1>Test technique: Gabriel Gagnon</h1>
      {weatherDays && <WeatherTable weatherDays={weatherDays} />}
      {footballTeams && <FootBallTable teams={footballTeams} />}
    </div>
  );
}