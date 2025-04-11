// seteo campos del LD para probar coincidencias
// funcion para modificar campos de la lista descriptiva 
const modificarDD = (miembro, campo, valor) => {
    //    modifica contenido del campo no se uso
        //console.log("escribo en `${campo}${miembro}`");
        document.getElementById(`${campo}${miembro}`).innerText = valor;
    }
// cada coincidencia lo marca con un color distinto
// pide un color por cada coincidencia
modificarDD(0, "firstName", "alejandro");
modificarDD(0, "secondName", "martin");
modificarDD(0, "firstSurname", "suarez");
modificarDD(0, "secondSurname", "");

modificarDD(1, "firstName", "gabriel"); // no dejar vacio no hago control
modificarDD(1, "secondName", "");
modificarDD(1, "firstSurname", "gonzalez");
modificarDD(1, "secondSurname", "");

// punto 1 
title = document.getElementsByTagName("title");
console.log(title[0].text);

// punto 3 LLER DL

const dD = document.getElementsByTagName('dd');

let persona =[]
let arrPersona2 = []
let arrPersonaForm = []

for (let i = 0; i < (dD.length - 1); i+=4)
{
    // lee de a 4 DD y agrega la persona al array
    persona["firstName"] = dD[i].innerText;
    persona["secondName"] = dD[i+1].innerText;
    persona["firstSurname"] = dD[i+2].innerText;
    persona["secondSurname"] = dD[i+3].innerText;
    arrPersona2.push(persona);    
    persona =[];
    
}    

//console.log(arrPersona2);

const verNombreCompleto = (arrPersona2) =>
{
    var string = "----\n";
    for (let i = 0; i < arrPersona2.length; i++)
    {
        let persona = arrPersona2[i]; // simplifica linea
    //    console.log(persona);
        let firstName = persona["firstName"].toLowerCase(); // pasamos el nombre a minusculas
        let secondName = persona["secondName"].toLowerCase();
        firstName = firstName[0].toUpperCase().concat(firstName.substring(1)); // la primera letra en mayuscula
        
        if (secondName != "") // si no hay segundo nombre da error
            secondName = secondName[0].toUpperCase().concat(secondName.substring(1)); // la primera letra en mayuscula
        
        //let secondName = persona["secondName"].toUpperCase(); // pasa a mayusculas
        let firstSurname = persona["firstSurname"].toUpperCase(); // 
        let secondSurname = persona["secondSurname"].toUpperCase();
        let completeName = `${firstName}${(secondName)?" " + secondName:""}${(firstSurname)?" " + firstSurname:""}${(secondSurname)?" " + secondSurname:""}`

        string += `"Integrante ${i+1}: ${completeName}"\n`;
    }
    string += "----\n";
    console.log(string);
}
verNombreCompleto(arrPersona2);
/// FIN PUNTO 3


const modificarStyle = (campo1, campo2, valor) => {
    // modifica estilo del campo que venga
    document.getElementById(`${campo1}0`).style.color = valor;
    document.getElementById(`${campo2}1`).style.color = valor;
}

const modificarStyleForm = (campo1, campo2, valor) => {
    // modifica estilo del campo que venga
    document.getElementById(`p0_${campo1}`).style.color = valor;
    document.getElementById(`p1_${campo2}`).style.color = valor;
}


// PUNTO 4
// buscamos coincidencias

const verificaCoincidencia = (arrPerson, posicion, tipo, origen ) => {
    // tipo 0 nombre 1 apellido
    campo ="Name";
    if (tipo == 1)
        campo ="Surname";

//    console.log(arrPerson);
    coincidencia = false;
    //console.log("comparo " + arrPerson[0][`${posicion}${campo}`].toLowerCase(), arrPerson[1][`first${campo}`].toLowerCase())
    dato1 = arrPerson[0][`${posicion}${campo}`]
    dato2 = arrPerson[1][`first${campo}`]
    if (dato1 != "" && dato2 != "")
        if (dato1.toLowerCase() == dato2.toLowerCase())     
        {
            //console.log("coincidencia");
            coincidencia = true;
            color = prompt("Ingrese un color");
            modificarStyle(`${posicion}${campo}`, `first${campo}`, color);
        }

    if (arrPerson[1]["secondName"] != "")
    {
        //console.log("comparo " + arrPerson[0][`${posicion}${campo}`].toLowerCase(), arrPerson[1][`second${campo}`].toLowerCase())
        dato1 = arrPerson[0][`${posicion}${campo}`]
        dato2 = arrPerson[1][`second${campo}`]
        if (dato1 != "" && dato2 != "") // si hay vacio lowercase da error
            if (dato1.toLowerCase() == dato2.toLowerCase())     
            {
                //console.log("coincidencia");
                color = prompt("Ingrese un color");
                modificarStyle(`${posicion}${campo}`, `second${campo}`, color);
                coincidencia = true;
            }
    }

    //if (coincidencia)
     //   console.log("hay coincidencia en campo ", campo)
    //else
    //    console.log("No hay coincidencia", campo)
    return coincidencia
    
}

c1 = verificaCoincidencia(arrPersona2, "first", 0);
c2 = verificaCoincidencia(arrPersona2, "second", 0);
hay = "SIN "
if (c1 || c2)
    hay = ""

console.log(`${hay}COINCIDENCIA EN NOMBRE`)

if (confirm("verifica apellidos?"))
{
    c1 = verificaCoincidencia(arrPersona2, "first", 1);
    c2 = verificaCoincidencia(arrPersona2, "second", 1);
    hay = "SIN "
    if (c1 || c2)
        hay = ""
    console.log(`${hay}COINCIDENCIA EN APELLIDO`)
            
}
/*

const handleSubmit = (event, person) => {
    event.preventDefault();
    const persona = {};
    //console.log("person-", person)
    persona.firstName = document.getElementById(`p${person}_firstName`).value;
    persona.secondName = document.getElementById(`p${person}_secondName`).value;
    persona.firstSurname = document.getElementById(`p${person}_firstSurname`).value;
    persona.secondSurname = document.getElementById(`p${person}_secondSurname`).value;
    //console.log("objeto persona-", persona)
    
    arrPersonaForm[person] = persona;    

    //console.log("array persona-", arrPersonaForm)
    if (arrPersonaForm[0] !== undefined && arrPersonaForm[1] !== undefined)
    {
      //  console.log("VERIFICANDO COINCIDENCIAS")
      //  console.log("persona1", arrPersonaForm[0])
      //  console.log("persona2", arrPersonaForm[1])
        verNombreCompleto(arrPersonaForm);
        verificaCoincidencia("firstName", arrPersonaForm, "form"); // verifico si el primer nombre de persona 1 está en persona2
        verificaCoincidencia("secondName", arrPersonaForm, "form"); // verifico si el segundo  nombre de persona 1 está en persona2
        if (color == false)
            {
                console.log("No hubo coincidencias");
            }
                    
    }
}
    */