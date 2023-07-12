
export const dataIncrement = (day: number) => {
    let today = new Date();
    today.setDate(today.getDate() + day);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();
  
    let formatToday = `${yyyy}-${mm}-${dd}`;
  
    return formatToday;
};

export const dataDecrease = (day: number) => {
    let today = new Date();
    today.setDate(today.getDate() - day);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();
  
    let formatToday = `${yyyy}-${mm}-${dd}`;
  
    return formatToday;
};