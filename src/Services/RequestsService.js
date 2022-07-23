import { openDb} from '../configDB.js'

export async function createTableRequests(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Requests ( id INTEGER PRIMARY KEY, title TEXT, description TEXT, sector TEXT, askedby TEXT, requestsdate DATE, conclude DATE, status TEXT)')
    })
}

export async function insertRequests(requests){
    openDb().then(db=>{
        db.run('INSERT INTO Requests (title, description, sector, askedby, requestsdate, status) VALUES (?,?,?,?,?,?)', [requests.title,  requests.description, requests.sector, requests.askedby, new Date().toLocaleString(), "PENDING"]);
    });
}

export async function updateRequests(requests){
    openDb().then(db=>{
        db.run('UPDATE Requests SET title=?, askedby=?, status=? WHERE id=?', [requests.title, requests.askedby, requests.status, requests.id]);
    });
}

export async function selectRequests(){
    return openDb().then(db=>{
        return db.all('SELECT * FROM Requests')
        .then(res=>res)
    });
}

export async function selectRequest(id){
    return openDb().then(db=>{
        return db.get('SELECT * FROM Requests WHERE id=?', [id])
        .then(res=>res)
    });
}

export async function deleteRequests(id){
    return openDb().then(db=>{
        return db.get('DELETE FROM Requests WHERE id=?', [id])
        .then(res=>res)
    });
}
export async function answerRequest(id){
    console.log("answerRequest")
    return openDb().then(db=>{
        return db.run('UPDATE Requests SET status=? WHERE id=?', ["IN ATTENDANCE", id])
    })
}
export async function finalizeRequest(id){
    console.log("answerRequest")
    return openDb().then(db=>{
        return db.run('UPDATE Requests SET status=?, conclude=? WHERE id=?', ["FINISHED", new Date().toLocaleString(),id])
    })
}

