import { openDb } from '../configDB.js'

export async function createTableEmployees(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Employees ( id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, sector TEXT, admission DATE )')
    })
}

export async function insertEmployees(employees){
    openDb().then(db=>{
        db.run('INSERT INTO Employees (name, email, password, sector, admission) VALUES (?,?,?,?,?)', [employees.name, employees.email, employees.password, employees.sector, new Date().toLocaleString()]);
    });
}

export async function updateEmployees(employees){
    openDb().then(db=>{
        db.run('UPDATE Employees SET name=?, email=?, password=?, sector=? WHERE id=?', [employees.name, employees.email, employees.password, employees.sector, employees.id]);
    });
}

export async function selectEmployees(){
    return openDb().then(db=>{
        return db.all('SELECT * FROM Employees')
        .then(res=>res)
    });
}

export async function selectEmployee(id){
    return openDb().then(db=>{
        return db.get('SELECT * FROM Employees WHERE id=?', [id])
        .then(res=>res)
    });
}

export async function deleteEmployees(id){
    return openDb().then(db=>{
        return db.get('DELETE FROM Employees WHERE id=?', [id])
        .then(res=>res)
    });
}

export async function selectEmail(email){
    return openDb().then(db=>{
        return db.get('SELECT * FROM Employees WHERE email=?', [email])
        .then(res=>res)
    });
}