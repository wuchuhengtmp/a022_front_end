export function stop() { 
    var mo = function (e) { e.preventDefault(); }
    document.body.style.overflow = 'hidden';
    document.addEventListener("touchmove",mo,false)
}

export function move() { 
    var mo = function (e) { e.preventDefault(); }
    document.body.style.overflow = "";
    document.removeEventListener("touchmove",mo,false)
}

//存储localstorage
export const setStore = (keyword, content) => { 
    if (!keyword) return 
    localStorage.setItem(keyword,JSON.stringify(content))
}

//获取localstorage
export const getStore = keyword => { 
    if (!keyword) return
    return JSON.parse(localStorage.getItem(keyword))
}

//删除localstorage
export const removeStore = keyword => { 
    if (!keyword) return
    localStorage.removeItem(keyword)
}