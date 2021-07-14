import { parseDat } from './datFiles/datParser'

const footballDataFilePath = process.env.PUBLIC_URL + '/data/football.txt'

export const getTeams = async (): Promise<Array<any>> => {
  return fetch(footballDataFilePath).then(async footballData => {
    const data = await footballData.text()
    return parseDat(data)
  })
}