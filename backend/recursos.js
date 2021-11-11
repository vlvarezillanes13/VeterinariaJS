module.exports = {
    mascotas: [
        {tipo:"perro",nombre:"pancho0",dueno:"Jhon"},
        {tipo:"perro",nombre:"pancho1",dueno:"Jhon"},
        {tipo:"perro",nombre:"pancho2",dueno:"Jhon"},
        {tipo:"perro",nombre:"pancho3",dueno:"Jhon"},
        {tipo:"perro",nombre:"pancho4",dueno:"Jhon"},
    ],
    veterinarios: [
        {nombre:"Vicente", apellido:"Alvarez", documento:"1234567890"},
        {nombre:"Valeria", apellido:"Gamboa", documento:"1234567891"},
        {nombre:"Francisco", apellido:"Villa", documento:"1234567892"},
        {nombre:"María", apellido:"Mendez", documento:"1234567893"},
    ],
    duenos: [
        {nombre:"Jorge", apellido:"Ahumada", documento:"1234567894"},
        {nombre:"Raul", apellido:"Almonacid", documento:"1234567895"},
        {nombre:"Maite", apellido:"Gomez", documento:"1234567896"},
        {nombre:"Francisca", apellido:"Casanova", documento:"1234567897"},
    ],
    consultas: [
        {
            mascota: 0,
            veterinario: 0,
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: "",
            diagnostico: ""
        },
    ],
};