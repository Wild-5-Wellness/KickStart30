import moment from 'moment'

export function spliceString (str, str2){
    const year = Number(str.slice(0,4))
      const month = Number(str.slice(5,7))
      const day = Number(str.slice(8,10))
      const hour = Number(str.slice(11,13))
      const minute = Number(str.slice(14,16))
      const year2 = Number(str2.slice(0,4))
      const month2 = Number(str2.slice(5,7))
      const day2 = Number(str2.slice(8,10))
      const hour2 = Number(str2.slice(11,13))
      const minute2 = Number(str2.slice(14,16))
      const initialDate = moment([year,month, day])
      const todaysDate = moment([year2, month2, day2])

      if(day < day2){
         if([7,14,21,28,30].includes(todaysDate.diff(initialDate,'days') + 1)){
         return true
        } else return todaysDate.diff(initialDate,'days') + 1
      } else if(day > day2){
        if([7,14,21,28,30].includes(todaysDate.diff(initialDate,'days') + 1)){
          return true
         } else return initialDate.diff(todaysDate,'days') + 1
      }
  }