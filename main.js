document.addEventListener("DOMContentLoaded", function() {
    const cantNombres = 2;
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
                coincidenNombres(integrante1, integrante2, cantNombres, valores1.length); 
            };
        }
        else
            alert("El nombre ingresado para integrante 2 no es válido. Intente nuevamente.");
            
    });

    function completar(form){
        return {
            nombre1: form.elements["nombre1"].value,
            nombre2: form.elements["nombre2"].value,
            apellido1: form.elements["apellido1"].value,
            apellido2: form.elements["apellido2"].value,
        };
    }
   
    function informarIntegrante(integrante){
        let valores = Object.values(integrante);
        let nombreyApellido = "";
        for(let i = 0; i < valores.length ; i++){
           nombreyApellido += valores[i];
            if(valores[i] != ""){
                nombreyApellido += " ";
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
        let i = min;
        while((i < max) && (!(esNombreIgual(valores1[i], valores2, max))|| (valores1[i] == ""))){
            i++;
        }
        return(i < max);
    }

    function esNombreIgual(palabra1, palabras2, cant){
        let j = 0;
            while ((j < cant) && (palabra1 != palabras2[j]))
                j++;
        return (j < cant);
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
    }

    function pedirColor(){
        const regEx = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        let color = prompt("Coincide al menos un nombre. Elija un color hexadecimal para destacarlo(s).");
        while (!(regEx.test(color))){
            color = prompt("Color inválido. Ingrese un número hexadecimal.");
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
        return (i == valores.length);

    }
})