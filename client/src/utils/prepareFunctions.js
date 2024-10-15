export const getUniqueValues = (arr, key)=> {
    const values = arr.map(item => item[key]);
    return [...new Set(values)];
}

export const filterByField = (arr, fieldKey, value)=> {
    return arr.filter(item => item[fieldKey] === value);
}

export const filterByObjId = (objArr,idArr)=>{
    if(!objArr){
        return []
    }

    return  objArr.filter(item=>idArr.includes(item._id))
}

export const filterLearn = (cardsArr, know, repeat) => {
  const concatArr = [...know,...repeat]
    const filtered = cardsArr.filter(card=>{
        if(concatArr.includes(card._id)){
            return false;
        }else {
            return true;
        }
    })
    return filtered;
}

export const separator = (arrQuestionObj,arrLearnObj) => {
  let questions = [];
  let learn = [];

  arrQuestionObj.map((itemQ)=>{
      const idx = arrLearnObj.findIndex(itemL=>itemL.baseId === itemQ._id)

      if(idx > -1){
          itemQ.learnId = arrLearnObj[idx]._id;
          learn.push(itemQ)
      } else{
          questions.push(itemQ)
      }
  })

    return { questions,learn}
}
