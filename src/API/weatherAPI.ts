import { parseDat } from './datFiles/datParser'

const weatherDataFilePath = process.env.PUBLIC_URL + '/data/weather.txt';

export const getWeather = async (): Promise<Array<any>> => {
  return fetch(weatherDataFilePath).then(async weatherData => {
    const data = await weatherData.text()
    const dayList = parseDat(data)
    return dayList.filter(({ Dy }) => !(Dy === 'mo'))
  })
}