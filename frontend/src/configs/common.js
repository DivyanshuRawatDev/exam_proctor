export function getTotalLogs(data) {

  const TotalLogs = data
    .map((data) => {
      return data.TotalCount;
    })
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  return TotalLogs;
}

export function treeSaved(data){
 return (data?.totalPoints/100).toFixed(0);
}

export function getTotalCarbonSaved(data){
    return (data?.totalPoints / 50).toFixed(1);
}

export function getTopFive(data){
    console.log(data)
}