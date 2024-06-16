const saveData = (data : any, type : string) => {
    const account = JSON.stringify(data.account);
    localStorage.setItem('account', account);
    localStorage.setItem('type' , type)
}

export default saveData;