const getHeaderIndexes = (rows: Array<string>) => {
  let headerIndexes: { [name: string]: number } = {};

  const headerRowChars = rows[0].split('')
  let index = 0
  let currentColumnTitle = ""
  while (index < headerRowChars.length) {
    if (headerRowChars[index] !== ' ') {
      currentColumnTitle = currentColumnTitle + headerRowChars[index]
    } else if (currentColumnTitle) {
      headerIndexes[currentColumnTitle] = index - currentColumnTitle.length
      currentColumnTitle = ""
    }
    index++;
  }

  return headerIndexes
}

const getRecordRows = (rows: Array<string>) => {
  const headerIndex = 0
  return rows.slice(headerIndex + 1).filter(row => !!row.match(/\w+/g))
}

const getColumnValueFromRow = (columnHeaderData: { title: string, startIndex: number }, row: string): number | string | undefined => {
  const { title, startIndex: columnStartIndex } = columnHeaderData
  const columnEndIndex = columnStartIndex + title.length

  const rowChars = row.split('')

  let startIndex = columnStartIndex
  while (rowChars[startIndex] !== ' ' && startIndex >= 0) {
    startIndex--
  }
  while (rowChars[startIndex] === ' ' && startIndex <= columnEndIndex) {
    startIndex++
  }

  let value = ""
  while (rowChars[startIndex] !== undefined && rowChars[startIndex] !== ' ') {
    value = value + rowChars[startIndex]
    startIndex++
  }

  const isValueNumber = !isNaN(Number.parseFloat(value))

  if (value === "") {
    return undefined
  } else if (isValueNumber) {
    return Number.parseFloat(value)
  } else {
    return value
  }
}

export const parseDat = (data: string) => {
  const rows = data.split('\n')

  // Aller récupérer l'index du premier char pour chaque colonne
  const headerIndexes = getHeaderIndexes(rows)

  // Avoir les rows valides seulement
  const recordRows = getRecordRows(rows)

  // Créer les objets
  const recordList = recordRows.map(row => {
    let recordObject: { [name: string]: number | string | undefined } = {};

    Object.keys(headerIndexes).forEach(columnTitle => {
      const columnHeaderData = { title: columnTitle, startIndex: headerIndexes[columnTitle] }
      recordObject[columnTitle] = getColumnValueFromRow(columnHeaderData, row)
    })

    return recordObject
  })

  return recordList

}