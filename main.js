document.addEventListener("DOMContentLoaded", function() {
    const cantNombres = 2; // se asume que hay dos nombres
    let integrante1 = null;
    let integrante2 = null;
    let form1 = document.querySelector("#form1");
    let form2 = document.querySelector("#form2");
    let coincidencias = document.querySelector("#coincidencias");
    let valores1 = [];
    let valores2 = [];
    let color = "none";
    
    form1.addEventListener('submit', function(event) {
        event.preventDefault();
        integrante1 = completar(form1);
        valores1 = Object.values(integrante1);
        if(validarForm(valores1))
            console.log(informarIntegrante(integrante1));
        else
            alert("El nombre ingresado para integrante 1 no es válido. Intente nuevamente.");
    });

    form2.addEventListener('submit', function(event) {
        event.preventDefault();
        integrante2 = completar(form2);
        valores2 = Object.values(integrante2);
        if(validarForm(valores2)){
            console.log(informarIntegrante(integrante2));
            coincidenNombres(integrante1, integrante2, 0, cantNombres); 
            if(confirm("Desea comprobar los apellidos?")){
                coincidenNombres(integrante1, integrante2, cantNombres, valores1.length); // se reutiliza la función de coincidenNombres, pero en vez de ir de 0 hasta cantNombres, va desde cantNombres hasta el final del arreglo
            };
        }
        else
            alert("El nombre ingresado para integrante 2 no es válido. Intente nuevamente.");
            
    });

    function completar(form){
        return {
            nombre1: form.elements["nombre1"].value, // como los name de los inputs de ambos formularios son iguales, se puede usar la misma función para ambos
            nombre2: form.elements["nombre2"].value,
            apellido1: form.elements["apellido1"].value,
            apellido2: form.elements["apellido2"].value,
        };
    }
   
    function informarIntegrante(integrante){
        let valores = Object.values(integrante);
        let nombreyApellido = "";
        for(let i = 0; i < valores.length ; i++){
           nombreyApellido += valores[i]; // se crea un string al que se le van concatenando los diferentes valores del objeto integrante. esto es para que se imprima todo en una sola línea.
            if(valores[i] != ""){
                nombreyApellido += " "; // si el input no es un espacio vacío, se suma un espacio al final (a fin de evitar que, si, por ejemplo, el usuario no tiene un segundo nombre o segundo apellido, se concatene un espacio extra)
            }
        }
        return nombreyApellido;
    }

    function coincidenNombres(integrante1, integrante2, min, max){     
        if ((integrante1 && integrante2) && coincideNombre(integrante1, integrante2, min, max)){ 
            color = pedirColor();
            let p = document.createElement("p");
            p.textContent = "Coincidencias";
            coincidencias.appendChild(p);

            let span1 = document.createElement("span");
            span1.textContent = "Integrante 1: ";
            coincidencias.appendChild(span1);
            imprimirCoincidencias(integrante1, color, min, max);

            let span2 = document.createElement("span");
            span2.textContent = "Integrante 2: ";
            coincidencias.appendChild(span2);
            imprimirCoincidencias(integrante2, color, min, max);

            console.log("Hubo coincidencias.");
        }
        else
            console.log("No hubo coincidencias"); 
    }

    function coincideNombre(integrante1, integrante2, min, max){
        let i = min; // se le pasa un min y un max a la funcion, para iterar nombres o apellidos según sea necesario
        while((i < max) && (!(esNombreIgual(valores1[i], valores2, max))|| (valores1[i] == ""))){
            i++; // el bucle va recorriendo los valores del primer integrante hasta que encuentra coincidencias para ese valor
        }
        return(i < max); // si el bucle no llega hasta el final del arreglo, quiere decir que encontró coincidencias
    }

    function esNombreIgual(palabra1, palabras2, cant){
        let j = 0; // se le pasa un valor de integrante1 y recorre integrante2 hasta encontrar coincidencias
            while ((j < cant) && (palabra1 != palabras2[j]))
                j++;
        return (j < cant); // misma lógica que coincideNombre
    }

    function imprimirCoincidencias(integrante, color, min, max){
        let valores = Object.values(integrante);
        //strong.textContent = "";
        for(let i = min; i < max; i++){
            if(valores[i] != "" && esNombreIgual(valores[i], valores2, max)){
                let strong = document.createElement("strong");
                strong.textContent = valores[i] + " ";
                strong.style.color = color;
                coincidencias.appendChild(strong);
            }
        }      
    } se recorren los valores de integrante y se verifica que tengan coincidencias. si las tienen, se escribe ne el html el nombre adentro de una etiqueta strong, y se modifica el atributo color en el css de strong introduciendo color ingresado por el usuario

    function pedirColor(){
        const regEx = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/; // expresión regular de color en número hexadecimal
        let color = prompt("Coincide al menos un nombre. Elija un color hexadecimal para destacarlo(s).");
        while (!(regEx.test(color))){
            color = prompt("Color inválido. Ingrese un número hexadecimal."); // si el color no es correcto, se le pide al usuario por prompt un número hasta que sea correcto
        }
        console.log(color);
        return color;     
    }

    function validarForm(valores){
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/; 
        let i = 0;
        while((i < valores.length) && (regex.test(valores[i]))){
            i++;

        }
        return (i == valores.length); // se recorren los valores del objeto integrantes, verificando que todas las instancias sean letras

    }
})
